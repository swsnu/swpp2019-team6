from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager


class User(AbstractBaseUser):
    objects = UserManager()
    email = models.EmailField(max_length=50, unique=True, db_index=True)
    nickname = models.CharField(max_length=50, unique=True, db_index=True)
    register_date = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    status_message = models.TextField(blank=True)
    #profile_photo_id = models.CharField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return "<{}, {}, {}>".format(self.email,
                                     self.nickname,
                                     self.register_date)


# Create your models here.
