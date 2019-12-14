from django.urls import path, include, re_path
from rest_framework_jwt.views import verify_jwt_token
from .views import Login, SignUp, UserList, UserSearch, CheckUserExist, UserProfilePhoto, UserSearchByNickname

urlpatterns = [
    path('auth/', Login.as_view(), name="authentication"),
    path('auth/verify/', verify_jwt_token, name="verify token"),
    path('signup/', SignUp.as_view(), name="register"),
    path('<int:id>/', UserList.as_view(), name="user information"),
    path('<int:id>/profile_photo/', UserProfilePhoto.as_view(), name="user profile photo"),
    path('search/<str:query>/', UserSearch.as_view(), name="user list"),
    path('check/email/<str:email>/', CheckUserExist.as_view(), name="email check"),
    path('check/nickname/<str:nickname>/', CheckUserExist.as_view(), name="nickname check"),
    path('search_by_nickname/<str:query>/', UserSearchByNickname.as_view(), name="user search by nickname"),
]
