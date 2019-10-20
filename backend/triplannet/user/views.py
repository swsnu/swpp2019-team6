from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.parsers import JSONParser, MultiPartParser, BaseParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import get_user_model
import json

from .serializers import JWTSerializer, UserSerializer
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


User = get_user_model()


class PlainTextParser(BaseParser):
    media_type='text/plain'
    def parse(self, stream, media_type=None, parser_context=None):
        return json.loads(stream.read().decode('utf-8'))


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

class UserList(APIView):

    serializer_class = UserSerializer
    parser_classes = (PlainTextParser, )

    def get(self, request, id=-1, *args, **kwargs):
        user = User.objects.get(pk=id)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        print(request.data)
        #data = json.load(request.data)
        user = User.objects.get(pk=request.user.id)
        user.password = request.data.get("password", user.password)
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
