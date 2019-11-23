import json
import requests
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from .models import Query, Place


class PlaceSearch(APIView):

    def _check_query_cache(self, query):
        if Query.objects.filter(query=query).exists():
            return True
        else:
            return False

    def parse(self, data, query):
        if not isinstance(data, dict) or "results" not in data:
            return None
        results = data["results"]
        parse_data = []
        for idx, result in enumerate(results):
            photos = result.get("photos", [])
            photo = photos[0] if photos else {}
            parse_data.append({
                "index": idx,
                "query": query,
                "name": result.get("name", None),
                "formatted_address": result.get("formatted_address", None),
                "lat": result.get("geometry", {}).get("location", {}).get("lat", 0.0),
                "lng": result.get("geometry", {}).get("location", {}).get("lng", 0.0),
                "place_id": result.get("place_id", None),
                "types": (result.get("types", []) or [None])[0],
                "rating": result.get("rating", None),
                "icon": result.get("icon", None),
                "photo_reference": photo.get("reference", None),
                "photo_width": photo.get("width", None),
                "photo_height": photo.get("height", None),
            })
        return parse_data

    def cache(self, data, query):
        pass

    def get(self, request, query, *args, **kwargs):
        if self._check_query_cache(query):
            pass
        else:
            url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
            params = {
                "query": query,
                "key": getattr(settings, 'CREDENTIAL_GOOGLE_MAPS', 'KEY')
            }
            response = requests.get(url, params=params)
            if response.status_code != 200:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            data = response.json()
            input_data = self.parse(data, query)
            if input_data == None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            self.cache(input_data, query)
            return Response(input_data, status=status.HTTP_200_OK)

