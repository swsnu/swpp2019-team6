from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.conf import settings

import os

def user_directory_path(instance, filename):
    return 'user/{}/{}'.format(instance.id, filename)

class User(AbstractBaseUser):
    objects = UserManager()
    email = models.EmailField(max_length=50, unique=True, db_index=True)
    nickname = models.CharField(max_length=50, unique=True, db_index=True)
    register_date = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    status_message = models.TextField(blank=True)
    profile_photo = models.ImageField(upload_to=user_directory_path,blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return "<{}, {}, {}>".format(self.email,
                                     self.nickname,
                                     self.register_date)
    # Override delete
    def delete(self, *args, **kargs):

        os.remove(os.path.join(settings.MEDIA_ROOT, self.profile_photo.path))
        super(User, self).delete(*args, **kargs)

# Create your models here.
