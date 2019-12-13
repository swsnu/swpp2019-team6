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

    def test_get_recommend(self):
        client = Client()
        token = self.get_token(client)

        temp_embed_vector= [1 for i in range(512)]
        temp_data1 = {
            "fork_parent": "",
            "head": {
            "days": [
            {
            "blocks": [
            {
                "title": "manhattan",
                "description": "",
                "time": "9:0",
                "start_location": ".",
                "end_location": "",
                "block_type": "CUS",
                "modified": True,
                "parent_block": None
                }
            ],
                "title": "",
                "day": "2019-12-13",
                "modified": True,
                "parent_day": None
            }
            ],
                "block_dist": [0,1,2,3,4],
                "travel_embed_vector":temp_embed_vector,
                "title": "new york",
                "summary": "",
                "description": "",
                "start_date": "2019-12-13",
                "end_date": "2019-12-13",
            },
        }
        temp_data1_json=json.dumps(temp_data1)

        response = client.post('/api/travel/', data=temp_data1_json, content_type='application/json',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = client.post('/api/travel/', data=temp_data1_json, content_type='application/json',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = client.post('/api/travel/', data=temp_data1_json, content_type='application/json',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = client.post('/api/travel/', data=temp_data1_json, content_type='application/json',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = client.post('/api/travel/', data=temp_data1_json, content_type='application/json',
                               HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        response = client.get('/api/travel/recommend/1/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(len(data), 3)

        response = client.get('/api/travel/recommend/1/3/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(len(data), 3)

        response = client.get('/api/travel/1/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

