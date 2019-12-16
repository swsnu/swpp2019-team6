from rest_framework_jwt.serializers import JSONWebTokenSerializer

from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model, authenticate
from datetime import datetime

UserModel = get_user_model()
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class JWTSerializer(JSONWebTokenSerializer):

    def __init__(self, *args, **kwargs):
        super(JWTSerializer, self).__init__(*args, **kwargs)

    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password')
        }
        if all(credentials.values()):
            user = authenticate(**credentials)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("Deactivated User")
                payload = jwt_payload_handler(user)
                return {
                    'token': jwt_encode_handler(payload),
                    'user': user
                }
            else:
                raise serializers.ValidationError("Invalid information")
        else:
            msg = "Must include '{}' and 'password'".format(self.username_field)
            raise serializers.ValidationError(msg)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ("id", "email", "password", "nickname", "status_message","profile_photo", "register_date")

    password = serializers.CharField(write_only=True)

    @classmethod
    def get_username_field(self, user_model):
        try:
            username_field = user_model.USERNAME_FIELD
        except:
            username_field = 'username'
        return username_field

    def create(self, validated_data):
        username_field = self.get_username_field(UserModel)
        info = {username_field: validated_data['email'],
                "nickname": validated_data['nickname']}
        user = UserModel.objects.create(**info)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.status_message = validated_data.get('status_message', instance.status_message)
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.register_date = validated_data.get('register_date', instance.register_date)
        instance.save()
        return instance

class UserProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['profile_photo']
        