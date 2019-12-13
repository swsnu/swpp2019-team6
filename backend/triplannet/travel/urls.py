
from django.urls import path
from .views import *

urlpatterns = [
    path('', travel.as_view(), name='travel'),
    path('<int:id>/',travel_id.as_view()),
    path('<int:id>/travelCommit/', travel_id_travelCommit.as_view()),
    path('travelCommit/<int:id>/photo/', travelCommitPhoto.as_view()),
    path('popular/',travel_popular.as_view(), name='travel_popular'),
    path('recent/',travel_recent.as_view(), name='travel_recent'),
    path('user/<int:id>/', user_travel_list.as_view(), name='user_travel_list'),
    path('tag/<tag>/', TagList.as_view(), name='tag_list'),
    path('settings/<int:id>/', TravelSettings.as_view(), name='travel_settings'),
    path('collaborator/<int:id>/', collaborator_travel_list.as_view(), name='collaborator_travel_list'),
]
