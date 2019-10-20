from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import get_user_model

from .serializers import JWTSerializer, UserSerializer
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class SignUp(generics.CreateAPIView):
    model = get_user_model()
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


