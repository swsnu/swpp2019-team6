from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

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
    # comments = models.ManyToManyField(
    #     Comment,
    #     related_name = 'travel_set',
    # )
    likes = models.ManyToManyField(
        User,
        related_name = 'like_of_Travel',
        blank=True
    )
    class Meta:
        ordering = ['-last_modified_time',]

class TravelCommit(models.Model):
    title = models.CharField(max_length=100)
    summary = models.TextField(blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    days = models.ManyToManyField(
        'travel.TravelDay',
        through = 'TravelDayList'
    )
    register_time = models.DateTimeField(auto_now_add=True)
    
    travel = models.ForeignKey(
        Travel,
        on_delete = models.CASCADE,
        related_name = 'travel_of_TravelCommit',
        null=True
    )
    author = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name = 'author_of_TravelCommit',
        # collaborators only
    )
    # tags= models.ManyToManyField(
    #     Tag,
    #     related_name ='travel_committed', 
    # )
    # photo = models.ImageField(
    #     upload_to = 'travel_photos/',
    #     height_field=500,
    #     width_field=500,
    # )

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
    end_location = models.TextField()
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
