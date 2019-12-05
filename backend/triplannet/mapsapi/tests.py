import unittest
from unittest import mock
from django.test import TestCase, Client
from rest_framework import status
import json

from .models import Query, Place

# sample place search response from google maps api
sample_search_response = {
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

result_search_response = {
    "search_index": 0,
    "query": "TEST",
    "name": sample_search_response["results"][0]["name"],
    "formatted_address": sample_search_response["results"][0]["formatted_address"],
    "lat": sample_search_response["results"][0]["geometry"]["location"]["lat"],
    "lng": sample_search_response["results"][0]["geometry"]["location"]["lng"],
    "place_id": sample_search_response["results"][0]["place_id"],
    "types": sample_search_response["results"][0]["types"][0],
    "rating": sample_search_response["results"][0]["rating"],
    "icon": sample_search_response["results"][0]["icon"],
    "photo_reference": sample_search_response["results"][0]["photos"][0]["photo_reference"],
    "photo_width": sample_search_response["results"][0]["photos"][0]["width"],
    "photo_height": sample_search_response["results"][0]["photos"][0]["height"],
}


def mocked_search_request(*args, **kwargs):
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

    if "params" in kwargs and isinstance(kwargs["params"], dict):
        if kwargs["params"]["query"] == "ERROR":
            return MockResponse({}, 400)
        if kwargs["params"]["query"] == "NONE":
            return MockResponse({}, 200)

    assert isinstance(args[0], str) and\
        args[0].startswith("https://maps.googleapis.com/maps/api")
    return MockResponse(sample_search_response, 200)


response_autocomplete_sample = {
    "predictions": [
        {
            "description": "Snug Harbor Cultural Center & Botanical Garden, Richmond Terrace, Staten Island, NY, USA",
            "id": "b6ec8710c5057ed07ad579e2dd0c195361580506",
            "matched_substrings": [
                {
                    "length": 3,
                    "offset": 0
                }
            ],
            "place_id": "ChIJw_2KmiJOwokRtifdssh9kq8",
            "reference": "ChIJw_2KmiJOwokRtifdssh9kq8",
            "structured_formatting": {
                "main_text": "Snug Harbor Cultural Center & Botanical Garden",
                "main_text_matched_substrings": [
                    {
                        "length": 3,
                        "offset": 0
                    }
                ],
                "secondary_text": "Richmond Terrace, Staten Island, NY, USA"
            },
            "terms": [
                {
                    "offset": 0,
                    "value": "Snug Harbor Cultural Center & Botanical Garden"
                },
                {
                    "offset": 48,
                    "value": "Richmond Terrace"
                },
                {
                    "offset": 66,
                    "value": "Staten Island"
                },
                {
                    "offset": 81,
                    "value": "NY"
                },
                {
                    "offset": 85,
                    "value": "USA"
                }
            ],
            "types": [
                "tourist_attraction",
                "park",
                "point_of_interest",
                "establishment"
            ]
        },
        {
            "description": "Snug Harbor Jazz Bistro, Frenchmen Street, New Orleans, LA, USA",
            "id": "e3315c1e54b94c062cc210ef70bb07ab7f067588",
            "matched_substrings": [
                {
                    "length": 3,
                    "offset": 0
                }
            ],
            "place_id": "ChIJTYbrSBimIIYREHktydiFVwQ",
            "reference": "ChIJTYbrSBimIIYREHktydiFVwQ",
            "structured_formatting": {
                "main_text": "Snug Harbor Jazz Bistro",
                "main_text_matched_substrings": [
                    {
                        "length": 3,
                        "offset": 0
                    }
                ],
                "secondary_text": "Frenchmen Street, New Orleans, LA, USA"
            },
            "terms": [
                {
                    "offset": 0,
                    "value": "Snug Harbor Jazz Bistro"
                },
                {
                    "offset": 25,
                    "value": "Frenchmen Street"
                },
                {
                    "offset": 43,
                    "value": "New Orleans"
                },
                {
                    "offset": 56,
                    "value": "LA"
                },
                {
                    "offset": 60,
                    "value": "USA"
                }
            ],
            "types": [
                "night_club",
                "bar",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ]
        }
    ],
    "status": "OK"
}

result_autocomplete_response = [
    {
        "query": "TEST",
        "search_index": 0,
        "description": response_autocomplete_sample["predictions"][0]["description"],
        "place_id": response_autocomplete_sample["predictions"][0]["place_id"],
        "structured_formatting": response_autocomplete_sample["predictions"][0]["structured_formatting"],
    },
    {
        "query": "TEST",
        "search_index": 1,
        "description": response_autocomplete_sample["predictions"][1]["description"],
        "place_id": response_autocomplete_sample["predictions"][1]["place_id"],
        "structured_formatting": response_autocomplete_sample["predictions"][1]["structured_formatting"],
    }
]


def mocked_autocomplete_request(*args, **kwargs):
    """
        Mock requests module

        params:
            data: json data to be response of GET request
            status_code: status code of response
        return:
            sample response data with 200 status when request autocomplete maps api
    """

    class MockResponse:

        def __init__(self, data, status_code):
            self.data = data
            self.status_code = status_code

        def json(self):
            return self.data

    if "params" in kwargs and isinstance(kwargs["params"], dict):
        if kwargs["params"]["input"] == "ERROR":
            return MockResponse({}, 400)
        if kwargs["params"]["input"] == "NONE":
            return MockResponse({}, 200)

    assert isinstance(args[0], str) and\
        args[0].startswith("https://maps.googleapis.com/maps/api")
    return MockResponse(response_autocomplete_sample, 200)



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

    @mock.patch('requests.get', side_effect=mocked_search_request)
    def test_get_search_info(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/search/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        result = json.loads(response.content)
        self.assertEqual(len(result), 1)
        self.assertDictEqual(result[0], result_search_response)

    @mock.patch('requests.get', side_effect=mocked_search_request)
    def test_result_cache_search(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/search/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.get('/api/maps/search/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        result = json.loads(response.content)
        self.assertEqual(mocked_get.call_count, 1)
        self.assertEqual(len(result), 1)
        self.assertDictEqual(result[0], result_search_response)

    @mock.patch('requests.get', side_effect=mocked_search_request)
    def test_error_case_search(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/search/ERROR/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = client.get('/api/maps/search/NONE/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(mocked_get.call_count, 2)

    @mock.patch('requests.get', side_effect=mocked_autocomplete_request)
    def test_get_autocomplete_info(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/autocomplete/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        result = json.loads(response.content)
        self.assertEqual(len(result), 2)
        self.assertDictEqual(result[0], result_autocomplete_response[0])
        self.assertDictEqual(result[1], result_autocomplete_response[1])

    @mock.patch('requests.get', side_effect=mocked_autocomplete_request)
    def test_result_cache_autocomplete(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/autocomplete/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.get('/api/maps/autocomplete/TEST/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        result = json.loads(response.content)
        self.assertEqual(mocked_get.call_count, 1)
        self.assertEqual(len(result), 2)
        self.assertDictEqual(result[0], result_autocomplete_response[0])
        self.assertDictEqual(result[1], result_autocomplete_response[1])

    @mock.patch('requests.get', side_effect=mocked_autocomplete_request)
    def test_error_case_autocomplete(self, mocked_get):
        client = Client()
        token = self.get_token(client)

        response = client.get('/api/maps/autocomplete/ERROR/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = client.get('/api/maps/autocomplete/NONE/',
                              HTTP_AUTHORIZATION="JWT {}".format(token))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(mocked_get.call_count, 2)
