
from django.urls import path
from .views import *

urlpatterns = [
    path('', travel.as_view(), name='travel'),
    path('<int:id>/',travel_id.as_view()),
    path('<int:id>/travelCommit/', travel_id_travelCommit.as_view()),
    path('popular/',travel_popular.as_view(), name='travel_popular'),
    path('recent/',travel_recent.as_view(), name='travel_recent'),
    
]