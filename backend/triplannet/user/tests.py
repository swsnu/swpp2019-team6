from django.test import TestCase, Client
from rest_framework import status
import json

from .models import User


class UserTestCase(TestCase):

    def register(self, client, username, password):
        response = client.post('/api/user/signup/', data = {
            "email": username,
            "password": password
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
        self.register(client, "test@test.co.kr", "test")
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
        self.register(client, "test@test.aa", "test")
        self.register(client, "test@test.bb", "test")
        token = self.login(client, "test@test.bb", "test")
        response = client.get('/api/user/1/', HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_user_info(self):
        client = Client()
        self.register(client, "test@test.aa", "test")
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
        self.register(client, "test@test.aa", "test")
        self.register(client, "test@test.bb", "test")
        self.register(client, "test@test.cc", "test")
        self.register(client, "test@test.dd", "test")
        self.register(client, "tast@test.ee", "test")
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
