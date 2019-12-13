from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.contrib.auth.hashers import check_password
import json

from .serializers import JWTSerializer, UserSerializer, UserProfilePhotoSerializer
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


User = get_user_model()


class SignUp(generics.CreateAPIView):
    model = User
    permission_classes = (AllowAny, )
    authentication_classes = ()
    serializer_class = UserSerializer


class Login(APIView):

    serializer_class = JWTSerializer
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def get_serializer(self, *args, **kwargs):
        kwargs.update({
            'context': {
                'request': self.request,
                'view': self,
            }
        })
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.object.get('user')
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            return Response(response_data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckUserExist(APIView):

    permission_classes = (AllowAny, )
    authentication_classes = ()

    def get(self, request, *args, **kwargs):
        email = kwargs.get("email", None)
        nickname = kwargs.get("nickname", None)

        if email:
            try:
                user = User.objects.get(email=email)
                return Response({"check": True},
                                status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({"check": False},
                                status=status.HTTP_200_OK)
        elif nickname:
            try:
                user = User.objects.get(nickname=nickname)
                return Response({"check": True},
                                status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({"check": False},
                                status=status.HTTP_200_OK)
        else:
            return Response({"check":False},
                            status=status.HTTP_400_BAD_REQUEST)

class UserList(APIView):

    serializer_class = UserSerializer
    parser_classes = (JSONParser, )

    def get(self, request, id=-1, *args, **kwargs):
        try:
            user = User.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.id)
        if 'current_password' in request.data:
            if not check_password(request.data.get('current_password'), user.password):
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                user.set_password(request.data.get("new_password", user.password))
        user.nickname = request.data.get("nickname", user.nickname)
        user.status_message = request.data.get("status_message", user.status_message)
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data)

class UserSearch(APIView):
    serializer_class = UserSerializer

    def get(self, request, query, *args, **kwargs):
        users = User.objects.filter(email__startswith=query).\
                             order_by('email')[0:10]
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

class UserProfilePhoto(APIView):
    serializer_class = UserProfilePhotoSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def put(self, request, id, *args, **kwargs):
        try:
            user = User.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404
        serializer = self.serializer_class(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSearchByNickname(APIView):

    serializer_class = UserSerializer
    parser_classes = (JSONParser, )

    def get(self, request, query, *args, **kwargs):
        try:
            user = User.objects.get(nickname=query)
        except ObjectDoesNotExist:
            raise Http404
        
        serializer = self.serializer_class(user)
        return Response(serializer.data)

