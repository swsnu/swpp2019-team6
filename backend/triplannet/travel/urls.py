from django.urls import path
from .views import *

urlpatterns = [
    path('', travel.as_view(), name='travel'),
    path('<int:id>/',travel_id.as_view()),
    path('<int:id>/travelCommit/', travel_id_travelCommit.as_view()),
    path('popular/',travel_popular.as_view(), name='travel_popular'),
    path('recent/',travel_recent.as_view(), name='travel_recent'),
    path('user/<int:id>/', user_travel_list.as_view(), name='user_travel_list'),
    path('tag/<tag>/', TagList.as_view(), name='tag_list'),
    path('recommend/<int:id>/', travel_recommend_bytravel.as_view(), name='travel_recommend_bytravel'),
    path('recommend/<int:user_id>/<int:travel_id>/', travel_recommend_byuser.as_view(), name='travel_recommend_byuser'),
    path('settings/<int:id>/', TravelSettings.as_view(), name='travel_settings'),
    path('collaborator/<int:id>/', collaborator_travel_list.as_view(), name='collaborator_travel_list'),
]
