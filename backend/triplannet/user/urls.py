from django.urls import path, include
#from .views import views
from rest_framework_jwt.views import verify_jwt_token
from .views import Login, SignUp, UserList, UserSearch

urlpatterns = [
    path('auth/', Login.as_view(), name="authentication"),
    path('auth/verify/', verify_jwt_token, name="verify token"),
    path('signup/', SignUp.as_view(), name="register"),
    path('<int:id>/', UserList.as_view()),
    path('search/<str:query>/', UserSearch.as_view())
]
