from django.urls import path, include, re_path
from .views import PlaceSearch

urlpatterns = [
        path('search/<str:query>/', PlaceSearch.as_view(), name="place list"),
]
