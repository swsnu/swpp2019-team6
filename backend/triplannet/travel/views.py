from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

from .models import Travel

class travel(APIView):

    def post(self, request, *args, **kwargs):
        return Response("POST SUCCESS")

class travel_popular(APIView):

    def get(self, request, *args, **kwargs):
        
        return Response("travel_popular get SUCCESS")


class travel_recent(APIView):
    def get(self, request, *args, **kwargs):
        travels = Travel.objects.all()
        # travels = travels[:min(len(travels),10)]
        # return Response(travels)
        return Response("travel_recent get SUCCESS")

# class travelCommit(APIView):



