
from django.urls import path
from .views import travel,travel_id,travel_popular,travel_recent

urlpatterns = [
    path('', travel.as_view(), name='travel'),
    path('<int:id>/',travel_id.as_view()),
    path('popular/',travel_popular.as_view(), name='travel_popular'),
    path('recent/',travel_recent.as_view(), name='travel_recent'),
    
]