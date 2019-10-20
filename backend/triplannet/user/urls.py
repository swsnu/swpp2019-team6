from django.urls import path, include
#from .views import views
from rest_framework_jwt.views import obtain_jwt_token
from .views import Login, SignUp

urlpatterns = [
    path('login/', Login.as_view(), name="authentication"),
    path('signup/', SignUp.as_view(), name="register")
]
