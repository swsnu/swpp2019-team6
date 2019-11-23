import unittest
from unittest import mock
from django.test import TestCase, Client
from rest_framework import status
import json

from .models import Query, Place

# sample place search response from google maps api
sample_response = {
    "html_attributions" : [],
    "results" : [
        {
            "formatted_address" : "1 Gwanak-ro, Gwanak-gu, Seoul, South Korea",
            "geometry" : {
                "location" : {
                    "lat" : 37.459882,
                    "lng" : 126.951905
                },
                "viewport" : {
                    "northeast" : {
                        "lat" : 37.46123182989272,
                        "lng" : 126.9532551298927
                    },
                    "southwest" : {
                        "lat" : 37.45853217010728,
                        "lng" : 126.9505554701072
                    }
                }
            },
            "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/school-71.png",
            "id" : "0e35baf3ee30de1c3bf1c6c896f83ef29e4a8448",
            "name" : "Seoul National University",
            "photos" : [
                {
                    "height" : 2048,
                    "html_attributions" : [
                        "\u003ca href=\"https://maps.google.com/maps/contrib/102812970469038445765/photos\"\u003eJeongmin Kim\u003c/a\u003e"
                    ],
                    "photo_reference" : "CmRaAAAA8S4KcSt5M3GLKB_18Q4QkUfGVSMqR5f80NQlGEvb2V8JkqLuOjzCG2QidsKBSlrGJMZLoQ4mjQVGawj-PkYW6CCndF6vO3hOWD1SOOwoA03GJquAFAbbTXUHHajbhY7IEhDJtpGDpTZvSUodtZ8XEXVAGhQ5wqgGmu1rN53y_9FxXKs1pwcD3A",
                    "width" : 1536
                }
            ],
            "place_id" : "ChIJpeKhoOiffDUR58XwBLzu4qE",
            "plus_code" : {
                "compound_code" : "FX52+XQ Seoul",
                "global_code" : "8Q98FX52+XQ"
            },
            "rating" : 4.6,
            "reference" : "ChIJpeKhoOiffDUR58XwBLzu4qE",
            "types" : [ "university", "point_of_interest", "establishment" ],
            "user_ratings_total" : 994
        }
    ],
    "status" : "OK"
}



def mocked_request(*args, **kwargs):
    """
        Mock requests module

        params:
            data: json data to be response of GET request
            status_code: status code of response
        return:
            sample response data with 200 status when request maps api
    """

    class MockResponse:

        def __init__(self, data, status_code):
            self.data = data
            self.status_code = status_code

        def json(self):
            return self.data

    if isinstance(args[0], str) and\
        args[0].startswith("https://maps.googleapis.com/maps/api"):
        return MockResponse(sample_response, 200)
    else:
        return MockResponse({}, 400)



class UserTestCase(TestCase):

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

    @mock.patch('requests.get', side_effect=mocked_request)
    def test_get_search_info(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/search/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        result = json.loads(response.content)
        self.assertEqual(len(result), 1)
        self.assertIn("formatted_address", result[0])

