import unittest
from django.test import TestCase, Client
from rest_framework import status
import json

class TagTestCase(TestCase):

    def get_token(self, client):
        response = client.post('/api/user/signup/', data = {
            "email": "test@test.com",
            "password": "test",
            "nickname": "test"
        })
        assert response.status_code == status.HTTP_201_CREATED, response.content

        response = client.post('/api/user/auth/', data = {
            "email": "test@test.com",
            "password": "test"
        })
        token_json = json.loads(response.content)
        token = token_json["token"]
        return token

    def test_add_tag(self):
        client = Client()
        token = self.get_token(client)

        response = client.post('/api/travel/tag/TEST/',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_tags(self):
        client = Client()
        token = self.get_token(client)

        response = client.post('/api/travel/tag/TEST1/',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post('/api/travel/tag/TEST2/',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post('/api/travel/tag/TEST3/',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post('/api/travel/tag/TEST4/',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.get('/api/travel/tag/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(len(data), 4)

