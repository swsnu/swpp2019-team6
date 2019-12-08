from django.test import TestCase, Client
from django.test.client import encode_multipart, BOUNDARY, MULTIPART_CONTENT
from rest_framework import status
import json
from io import BytesIO
from PIL import Image
from django.core.files.base import File
from .models import User

import tempfile

class UserTestCase(TestCase):

    def register(self, client, username, nickname, password):
        response = client.post('/api/user/signup/', data = {
            "email": username,
            "password": password,
            "nickname": nickname
        })
        assert response.status_code == status.HTTP_201_CREATED, response.content

    def login(self, client, username, password):
        response = client.post('/api/user/auth/', data = {
            "email": username,
            "password": password
        })
        try:
            token_json = json.loads(response.content)
            token = token_json["token"]
        except:
            token = None
        return token

    def test_signUp(self):
        client = Client()
        data = {
            "error": "test@test.com"
        }
        response = client.post('/api/user/signup/', data)
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)
        data = {
            "email": "test@test.coms",
            "nickname": "tester",
            "password": "password"
        }
        response = client.post('/api/user/signup/', data)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)
        response = client.post('/api/user/auth/', data)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)

    def test_login(self):
        client = Client()
        self.register(client, "test@test.co.kr", "tester", "test")
        data = {
            "email": "test@test.co.kr",
            "password": "test"
        }
        response = client.post('/api/user/auth/', data)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        token = json.loads(response.content)
        self.assertIsInstance(token, dict)
        self.assertIn("token", token.keys())
        self.assertIsNotNone(token.get("token"))

    def test_get_user_info(self):
        client = Client()
        self.register(client, "test@test.aa", "tester1", "test")
        self.register(client, "test@test.bb", "tester2", "test")
        token = self.login(client, "test@test.bb", "test")
        response = client.get('/api/user/1/', HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_user_info(self):
        client = Client()
        self.register(client, "test@test.aa", "tester", "test")
        token = self.login(client, "test@test.aa", "test")
        data = {
            "status_message": "hi there?"
        }
        response = client.put('/api/user/1/', data=data,
                              content_type="application/json",
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_info = json.loads(response.content)
        self.assertEqual(user_info["status_message"], "hi there?")

    def test_search_user(self):
        client = Client()
        self.register(client, "test@test.aa", "tester1", "test")
        self.register(client, "test@test.bb", "tester2", "test")
        self.register(client, "test@test.cc", "tester3", "test")
        self.register(client, "test@test.dd", "tester4", "test")
        self.register(client, "tast@test.ee", "tester5", "test")
        token = self.login(client, "test@test.aa", "test")
        response = client.get('/api/user/search/t/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        result = json.loads(response.content)
        self.assertEqual(len(result), 5)
        response = client.get('/api/user/search/test/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        result = json.loads(response.content)
        self.assertEqual(len(result), 4)

    def test_check_user_email(self):
        client = Client()
        self.register(client, "test@test.com", "tester", "test")
        response = client.get('/api/user/check/email/test@test.com/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({"check":True}, data)
        response = client.get('/api/user/check/email/error@test.com/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({"check":False}, data)

    def test_check_user_nickname(self):
        client = Client()
        self.register(client, "test@test.com", "tester", "test")
        response = client.get('/api/user/check/nickname/tester/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({"check":True}, data)
        response = client.get('/api/user/check/nickname/error/')
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({"check":False}, data)

    def test_user_profile_photo_put(self):
        client = Client()
        self.register(client, "test@test.io", "tester", "password")
        token = self.login(client, "test@test.io", "password")
        
        def get_temp_image_file():
            file = BytesIO()
            image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
            image.save(file, 'png')
            file.name = 'test.png'
            file.seek(0)
            return file 

        img = get_temp_image_file()
        data = {'profile_photo' : img}
        response=client.put('/api/user/1/profile_photo/',
                                content_type=MULTIPART_CONTENT,
                                HTTP_AUTHORIZATION="JWT {}".format(token),
                                data=data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)