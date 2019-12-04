from django.urls import path, include, re_path
from .views import PlaceSearch, PlaceAutoComplete

urlpatterns = [
    path('autocomplete/<str:query>/', PlaceAutoComplete.as_view(), name="autoComplete"),
    path('search/<str:query>/', PlaceSearch.as_view(), name="place list"),
]
