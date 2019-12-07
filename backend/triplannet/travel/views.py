from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist

from .models import Travel, TravelCommit, TravelDayList, Tag
from .serializers import *

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
        travels = Travel.objects.filter(author_id=id)
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

