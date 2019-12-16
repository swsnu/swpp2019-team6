from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from django_mysql.models import ListCharField, ListTextField

import os

User = get_user_model()


def travelCommit_directory_path(instance, filename):
    return 'travelCommit/{}/{}'.format(instance.id, filename)


class Travel(models.Model):

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name = 'author_of_Travel',
    )
    collaborators = models.ManyToManyField(
        User,
        blank=True,
        related_name = 'collaborator_of_Travel',

    )
    head = models.ForeignKey(
        'travel.TravelCommit',
        on_delete = models.SET_NULL,
        related_name = 'head_of_travel',
        null = True,
    )

    # fork_parent == None : is_forked - False,
    # fork_parent != None : is_forked - True,
    fork_parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        default = None,

    )
    register_time =models.DateTimeField(auto_now_add=True)
    last_modified_time = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)
    allow_comments = models.BooleanField(default=True)
    likes = models.ManyToManyField(
        User,
        related_name = 'like_of_Travel',
        blank=True
    )
    views = models.ManyToManyField(
        User,
        related_name = 'views_of_Travel',
        blank=True
    )

    class Meta:
        ordering = ['-last_modified_time',]

class Tag(models.Model):
    word = models.CharField(max_length=50, primary_key=True)

class temp(models.Model):
    block = ListTextField(base_field=models.IntegerField(), size=5)
    vector = ListTextField(base_field=models.IntegerField(), size=5)

class TravelCommit(models.Model):
    title = models.CharField(max_length=100)
    summary = models.TextField(blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    block_dist = ListTextField(base_field=models.IntegerField(), size=5, default=[1])
    travel_embed_vector = ListTextField(base_field=models.IntegerField(), size=512, default=[1])
    days = models.ManyToManyField(
        'travel.TravelDay',
        through = 'TravelDayList'
    )
    register_time = models.DateTimeField(auto_now_add=True)

    travel = models.ForeignKey(
        Travel,
        on_delete = models.CASCADE,
        related_name = 'travelCommits',
        null=True
    )
    author = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name = 'author_of_TravelCommit',
        # collaborators only
    )

    photo = models.ImageField(
       upload_to=travelCommit_directory_path,blank=True, null=True
    )

    # Override delete
    def delete(self, *args, **kargs):
        os.remove(os.path.join(settings.MEDIA_ROOT, self.photo.path))
        super(TravelCommit, self).delete(*args, **kargs)
    tags= models.ManyToManyField(
        Tag,
        related_name ='travel_tags',
    )


class TravelDay(models.Model):
    title = models.CharField(max_length=100,blank=True)
    blocks = models.ManyToManyField(
        'travel.TravelBlock',
        through = 'TravelBlockList',
    )
    day = models.DateField()
    parent_day = models.ForeignKey(
        "self",
        on_delete = models.SET_NULL,
        related_name = 'child_day',
        null = True,
        default = None,
    )
    modified = models.BooleanField(default=True)


class TravelBlock(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    time = models.TimeField(null=True, blank=True)
    start_location = models.TextField()
    end_location = models.TextField(null=True, blank=True)
    block_type = models.CharField(
        max_length=3,
        choices=[
            ('CUS','Custom'),
            ('ACT', 'Activity'),
            ('ACM', 'Accomodation'),
            ('TRN','Transportation'),
            ('RST','Restaurant')
        ]
    )
    parent_block = models.ForeignKey(
        "self",
        on_delete = models.SET_NULL,
        related_name = 'child_block',
        null = True,
        default = None,
    )
    modified = models.BooleanField(default=True)


class TravelDayList(models.Model):
    TravelCommit = models.ForeignKey(
        TravelCommit,
        on_delete = models.CASCADE,
    )
    TravelDay = models.ForeignKey(
        TravelDay,
        on_delete = models.CASCADE,
    )
    index = models.IntegerField()
    class Meta:
        ordering = ['TravelCommit','TravelDay','index',]
        unique_together = ['TravelCommit','TravelDay','index']

class TravelBlockList(models.Model):
    TravelDay = models.ForeignKey(
        TravelDay,
        on_delete = models.CASCADE,
    )
    TravelBlock = models.ForeignKey(
        TravelBlock,
        on_delete = models.CASCADE,
    )
    index = models.IntegerField()
    class Meta:
        ordering = ['TravelDay','TravelBlock','index',]
        unique_together = ['TravelDay','TravelBlock','index']


class Comment(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name = 'comments',
    )
    travel = models.ForeignKey(
        Travel,
        on_delete=models.CASCADE,
        related_name = 'comments'
    )
    content = models.TextField()
    register_time =models.DateTimeField(auto_now_add=True)
