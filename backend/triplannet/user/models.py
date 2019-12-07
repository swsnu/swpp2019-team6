from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.conf import settings
from django.dispatch import receiver

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



@receiver(models.signals.pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `User` object is updated
    with new file.
    """
    if not instance.pk:
        return False
    try:
        old_profile_photo = User.objects.get(pk=instance.pk).profile_photo
    except User.DoesNotExist:
        return False

    if not old_profile_photo:
        return False

    new_profile_photo = instance.profile_photo
    if not old_profile_photo == new_profile_photo:
        if os.path.isfile(old_profile_photo.path):
            os.remove(old_profile_photo.path)
# Create your models here.
