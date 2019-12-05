from django.db import models


class Query(models.Model):

    query = models.CharField(max_length=50, primary_key=True)


class Place(models.Model):

    query = models.ForeignKey(Query, to_field="query", on_delete=models.CASCADE)
    search_index = models.SmallIntegerField(null=True)
    name = models.CharField(max_length=50)
    formatted_address = models.CharField(max_length=100)
    lat=models.FloatField()
    lng=models.FloatField()
    place_id = models.CharField(max_length=50)
    types = models.CharField(max_length=50, null=True)
    rating=models.FloatField(null=True)
    icon=models.CharField(max_length=40, null=True)
    photo_reference=models.CharField(max_length=200, null=True)
    photo_height=models.IntegerField(null=True)
    photo_width =models.IntegerField(null=True)
    photo_image =models.ImageField(null=True)

