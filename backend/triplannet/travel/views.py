from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from django.db.models import Count

from .models import Travel, TravelCommit, TravelDayList, Tag
from .serializers import *

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json

User = get_user_model()
class travel(APIView):

    serializer_class = TravelSerializer
    def post(self, request, *args, **kwargs):
        request.data['author']=request.user.id
        try:
            request.data['head']['author']=request.user.id
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print('TRAVELSERIALIZER VALID')
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        print('TRAVELSERIALIZER INVALID')
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class travel_fork(APIView):
    def post(self, request, id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        
        travel_data=TravelSerializer(travel).data
        travel_data.pop('likes')
        travel_data.pop('collaborators')
        travel_data.pop('views')
        travel_data['fork_parent']=id
        photo=travel_data['head'].pop('photo')[1:]
        photo=photo[photo.find('/')+1:]
        travel_data['author']=request.user.id
        travel_data['head']['author']=request.user.id
        travel_data['head'].pop('travel')

        serializer= TravelSerializer(data=travel_data)
        if serializer.is_valid():
            travel=serializer.save()
            head=travel.head
            head.photo=photo
            head.save()    
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class travel_view_update(APIView):
    def put(self, request,id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        try:
            user = User.objects.get(pk=request.user.id)
        except  ObjectDoesNotExist:
            raise Http404
        travel.views.add(user)
        travel.save()
        return Response(status=status.HTTP_200_OK)

class travel_like_update(APIView):
    def put(self, request,id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        try:
            user = User.objects.get(pk=request.user.id)
        except  ObjectDoesNotExist:
            raise Http404
        travel.likes.add(user)
        travel.save()
        return Response(status=status.HTTP_200_OK)

class travel_id(APIView):

    serializer_class = TravelSerializer

    def get(self,request,id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        
        travelCommits = TravelCommit.objects.filter(travel_id=travel.id, author_id=request.user.id)
        if travelCommits:
            head=travelCommits.order_by('-register_time')[0]
            if head.register_time > travel.head.register_time:
                travel.head=head
            serializer = self.serializer_class(travel)
            return Response(serializer.data)
        else :
            serializer = self.serializer_class(travel)
            return Response(serializer.data)
        


    def put(self, request, id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404

        request.data['author']=request.user.id
        request.data['travel']=travel.id
        serializer = TravelCommitSerializer(data=request.data)
        if serializer.is_valid():
            travel.head = serializer.save()
            travel.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Creating a new travelCommit seems to be not implemented,
        # so this doens't support deleting travel commits.
        # travelCommits = TravelCommit.objects.filter(travel__id=4)
        # print(travelCommits)
        travel.delete()
        return Response(status=status.HTTP_200_OK)

class travel_recommend_byuser(APIView):
    serializer_class = TravelSerializer

    def get(self, request, user_id, travel_id, *args, **kwargs):
        try:
            user = User.objects.get(pk=user_id)
        except  ObjectDoesNotExist:
            raise Http404

        user_view=user.views_of_Travel
        user_view_idlist=list(user_view.values_list('id', flat=True))
        user_view_idlist=user_view_idlist+[travel_id]

        block_dist_view = Travel.objects.filter(pk__in=user_view_idlist).values_list('head__block_dist', flat=True)
        travel_embed_vector_view = Travel.objects.filter(pk__in=user_view_idlist).values_list('head__travel_embed_vector', flat=True)

        block_dist_nonview = Travel.objects.exclude(pk__in=user_view_idlist).values_list('head__block_dist', flat=True)
        travel_embed_vector_nonview = Travel.objects.exclude(pk__in=user_view_idlist).values_list('head__travel_embed_vector', flat=True)

        block_dist_view_list=list(block_dist_view)
        block_dist=list(map(sum,zip(*block_dist_view_list)))

        travel_embed_vector_view_list=list(travel_embed_vector_view)
        travel_embed_vector=list(map(sum,zip(*travel_embed_vector_view_list)))
        if len(list(block_dist_nonview))>0 :
            block_sim=cosine_similarity([block_dist],list(block_dist_nonview))
            block_sim=block_sim[0]
            embed_sim=cosine_similarity([travel_embed_vector], list(travel_embed_vector_nonview))
            embed_sim=embed_sim[0]
            tot_sim=block_sim+embed_sim
            sim_maxinds=tot_sim.argsort()[-3:][::-1]
            id_list=Travel.objects.exclude(pk__in=user_view_idlist).values_list('id', flat=True)
            id_list=list(id_list)
            sim_id_list=[id_list[i] for i in sim_maxinds]
        else :
            sim_id_list=[]
        recommend_travel_list=[]
        for id in sim_id_list:
            travel = Travel.objects.get(pk=id)
            serializer = self.serializer_class(travel)
            recommend_travel_list.append(serializer.data)
        
        return Response(recommend_travel_list)


class travel_recommend_bytravel(APIView):
    serializer_class = TravelSerializer

    def get(self, request, id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except  ObjectDoesNotExist:
            raise Http404
        travel=travel.head
        block_dist=travel.block_dist

        travel_embed_vector=travel.travel_embed_vector
        block_dist_list = Travel.objects.exclude(pk=id).values_list('head__block_dist', flat=True)
        travel_embed_vector_list = Travel.objects.exclude(pk=id).values_list('head__travel_embed_vector', flat=True)

        block_sim=cosine_similarity([block_dist], list(block_dist_list))
        block_sim=block_sim[0]
        embed_sim=cosine_similarity([travel_embed_vector], list(travel_embed_vector_list))
        embed_sim=embed_sim[0]
        tot_sim=block_sim+embed_sim
        sim_maxinds=tot_sim.argsort()[-3:][::-1]
        id_list=Travel.objects.exclude(pk=id).values_list('id', flat=True)
        id_list=list(id_list)
        sim_id_list=[id_list[i] for i in sim_maxinds]
        return Response(sim_id_list)


class travel_id_travelCommit(APIView):

    def post(self,request,id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404

        request.data['author']=request.user.id
        request.data['travel']=travel.id
        serializer = TravelCommitSerializer(data=request.data)
        if serializer.is_valid():
            print('TRAVELCOMMITSERIALIZER VALID')
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        print('TRAVELCOMMITSERIALIZER INVALID')
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class travel_popular(APIView):

    def get(self, request, *args, **kwargs):

        travels = Travel.objects.filter(head__isnull=False).annotate(num_likes=Count('likes')).order_by('-num_likes')[:min(Travel.objects.count(),10)]
        serializer = TravelSerializer(travels,many=True)
        return Response(serializer.data)


class travel_recent(APIView):

    def get(self, request, *args, **kwargs):
        travels = Travel.objects.filter(head__isnull=False)[:min(Travel.objects.count(),10)]
        serializer = TravelSerializer(travels,many=True)
        return Response(serializer.data)

class user_travel_list(APIView):

    def get(self, request, id, *args, **kwargs):
        travels = Travel.objects.filter(author_id=id, head__isnull=False)
        for travel in travels:
            travelcommits = TravelCommit.objects.filter(travel_id=travel.id, author_id=request.user.id)
            if travelcommits:
                head=travelcommits.order_by('-register_time')[0]
                if head.register_time > travel.head.register_time:
                    travel.head=head
                
        serializer = TravelSerializer(travels, many=True)
        
        return Response(serializer.data)

class collaborator_travel_list(APIView):
    def get(self, request, id, *args, **kwargs):
        travels = Travel.objects.filter(collaborators__id__icontains=id)
        serializer = TravelSerializer(travels, many=True)
        return Response(serializer.data)


class TagList(APIView):

    def get(self, request, tag, *args, **kwargs):
        print("tags", tag)
        if not tag:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if len(tag) > 50:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            tags = Tag.objects.filter(word__startswith=tag)[:10]
            tags = [tag.word for tag in tags]
            return Response(tags, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, tag, *rags, **kwargs):
        if not tag:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if len(tag) > 50:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            Tag.objects.create(word=tag)
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class TravelSettings(APIView):

    serializer_class = TravelSerializer

    def put(self, request, id, *args, **kwargs):
        travel = Travel.objects.get(pk=id)
        # If user doesn't exist...
        if 'added_collaborator' in request.data:
            try:
                added_collaborator = User.objects.get(nickname=request.data.get('added_collaborator'))
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            travel.collaborators.add(added_collaborator)
        if 'deleted_collaborator' in request.data:
            try:
                deleted_collaborator = User.objects.get(id=request.data.get('deleted_collaborator'))
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            if (travel.collaborators.filter(pk=deleted_collaborator.id).exists()):
                travel.collaborators.remove(deleted_collaborator)
        travel.is_public = request.data.get('is_public', travel.is_public)
        travel.allow_comments = request.data.get('allow_comments', travel.allow_comments)
        travel.save()
        serializer = self.serializer_class(travel)
        return Response(serializer.data)        
        
class travelCommitPhoto(APIView):
    serializer_class = TravelPhotoSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, id, *args, **kwargs):
        try:
            travelCommit = TravelCommit.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        
        if request.data['photo'] :
            serializer = self.serializer_class(travelCommit, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.data)

        travel = TravelCommit.travel
        travelCommits=travel.travelCommits.all().order_by('-register_time')
        if travelCommits.count() == 1:
            # post for the first time
            travelCommit.photo= None    
        else :
            lastestCommit = travelCommits[1]
            travelCommit.photo = lastestCommit.photo
        
        travelCommit.save()
        return Response(travelCommit.photo, status=status.HTTP_200_OK)
        
        

class comments(APIView):
    
    def get(self, request, tid, *args, **kwargs):

        try:
            travel = Travel.objects.get(pk=tid)
        except ObjectDoesNotExist:
            raise Http404

        # if not travel.is_public:
        #     accessibleUserIDs = [travel.author.id]
        #     if travel.collaborators:
        #         accessibleUserIDs += [user.id for user in travel.collaborators]
        #     print(accessibleUserIDs)
        #     if not request.user.id in accessibleUserIDs:
        #         return Response(status=status.HTTP_404_NOT_FOUND)
        #         # return Response(status=status.HTTP_401_UNAUTHORIZED)

        comments = travel.comments.all()
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data)
    
    def post(self, request, tid, *args, **kwargs):
        
        try:
            travel = Travel.objects.get(pk=tid)
        except ObjectDoesNotExist:
            raise Http404
        # if not travel.is_public and request.user.id != travel.author.id:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

        request.data['author']=request.user.id
        request.data['travel']=travel.id
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class comments_id(APIView):

    def delete(self, request, tid, cid, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=tid)
            comment = Comment.objects.get(pk=cid)

        except ObjectDoesNotExist:
            raise Http404

        if request.user.id != comment.author.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        comment.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, tid, cid, *args, **kwrags):
        try:
            travel = Travel.objects.get(pk=tid)
            comment = Comment.objects.get(pk=cid)
        except ObjectDoesNotExist:
            raise Http404
        
        if request.user.id != comment.author.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        request.data['author']=request.user.id
        request.data['travel']=travel.id
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class travelCommit_id(APIView):

    def get(self, request, travel_id, travelcommit_id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=travel_id)
            travelCommit = TravelCommit.objects.get(pk=travelcommit_id)
        except ObjectDoesNotExist:
            raise Http404
        
        if travelCommit.travel.id != travel.id:
            raise Http404

        travel.head=travelCommit
        
        serializer = TravelSerializer(travel)
        return Response(serializer.data, status=status.HTTP_200_OK)

class travel_commit_merge(APIView):
    def put(self, request, id, *args, **kwargs):
        try:
            travelCommit=TravelCommit.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        try:
            travel=travelCommit.travel
        except KeyError:
            raise Http404

        if request.user.id != travelCommit.author.id :
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        travel.head=travelCommit
        travel.save()
        serializer=TravelSerializer(travel)
        
        return Response(serializer.data,status=status.HTTP_200_OK)