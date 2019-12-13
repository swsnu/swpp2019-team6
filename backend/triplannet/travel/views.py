from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model

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
            pass
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print('TRAVELSERIALIZER VALID')
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        print('TRAVELSERIALIZER INVALID')
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class travel_id(APIView):
    serializer_class = TravelSerializer

    def get(self,request,id, *args, **kwargs):
        try:
            travel = Travel.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404

        serializer = self.serializer_class(travel)
        return Response(serializer.data)

    # def put(self,request,id,*args,**kwargs):

    #     try:
    #         travel = Travel.objects.get(pk=id)
    #     except ObjectDoesNotExist:
    #         raise Http404

    #     serializer = self.serializer_class(travel, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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

        block_sim=cosine_similarity([block_dist],list(block_dist_nonview))

        block_sim=block_sim[0]
        embed_sim=cosine_similarity([travel_embed_vector], list(travel_embed_vector_nonview))
        embed_sim=embed_sim[0]
        tot_sim=block_sim+embed_sim
        sim_maxinds=tot_sim.argsort()[-3:][::-1]
        id_list=Travel.objects.exclude(pk__in=user_view_idlist).values_list('id', flat=True)
        id_list=list(id_list)
        sim_id_list=[id_list[i] for i in sim_maxinds]

        return Response(sim_id_list)


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

        travels = Travel.objects.filter(head__isnull=False).order_by('-likes')[:min(Travel.objects.count(),10)]
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
            travel.collaborators.add(added_collaborator);
        travel.is_public = request.data.get('is_public', travel.is_public)
        travel.allow_comments = request.data.get('allow_comments', travel.allow_comments)
        travel.save()
        serializer = self.serializer_class(travel)
        return Response(serializer.data)


