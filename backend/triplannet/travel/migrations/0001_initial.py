# Generated by Django 2.2.6 on 2019-12-14 09:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models
import travel.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('word', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='temp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('block', django_mysql.models.ListTextField(models.IntegerField(), size=5)),
                ('vector', django_mysql.models.ListTextField(models.IntegerField(), size=5)),
            ],
        ),
        migrations.CreateModel(
            name='Travel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('register_time', models.DateTimeField(auto_now_add=True)),
                ('last_modified_time', models.DateTimeField(auto_now=True)),
                ('is_public', models.BooleanField(default=True)),
                ('allow_comments', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_of_Travel', to=settings.AUTH_USER_MODEL)),
                ('collaborators', models.ManyToManyField(blank=True, related_name='collaborator_of_Travel', to=settings.AUTH_USER_MODEL)),
                ('fork_parent', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='travel.Travel')),
            ],
            options={
                'ordering': ['-last_modified_time'],
            },
        ),
        migrations.CreateModel(
            name='TravelBlock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('time', models.TimeField(blank=True, null=True)),
                ('start_location', models.TextField()),
                ('end_location', models.TextField(blank=True, null=True)),
                ('block_type', models.CharField(choices=[('CUS', 'Custom'), ('ACT', 'Activity'), ('ACM', 'Accomodation'), ('TRN', 'Transportation'), ('RST', 'Restaurant')], max_length=3)),
                ('modified', models.BooleanField(default=True)),
                ('parent_block', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='child_block', to='travel.TravelBlock')),
            ],
        ),
        migrations.CreateModel(
            name='TravelBlockList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.IntegerField()),
                ('TravelBlock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.TravelBlock')),
            ],
            options={
                'ordering': ['TravelDay', 'TravelBlock', 'index'],
            },
        ),
        migrations.CreateModel(
            name='TravelCommit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('summary', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('block_dist', django_mysql.models.ListTextField(models.IntegerField(), default=[1], size=5)),
                ('travel_embed_vector', django_mysql.models.ListTextField(models.IntegerField(), default=[1], size=512)),
                ('register_time', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to=travel.models.travelCommit_directory_path)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_of_TravelCommit', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TravelDay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100)),
                ('day', models.DateField()),
                ('modified', models.BooleanField(default=True)),
                ('blocks', models.ManyToManyField(through='travel.TravelBlockList', to='travel.TravelBlock')),
                ('parent_day', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='child_day', to='travel.TravelDay')),
            ],
        ),
        migrations.CreateModel(
            name='TravelDayList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.IntegerField()),
                ('TravelCommit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.TravelCommit')),
                ('TravelDay', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.TravelDay')),
            ],
            options={
                'ordering': ['TravelCommit', 'TravelDay', 'index'],
                'unique_together': {('TravelCommit', 'TravelDay', 'index')},
            },
        ),
        migrations.AddField(
            model_name='travelcommit',
            name='days',
            field=models.ManyToManyField(through='travel.TravelDayList', to='travel.TravelDay'),
        ),
        migrations.AddField(
            model_name='travelcommit',
            name='tags',
            field=models.ManyToManyField(related_name='travel_tags', to='travel.Tag'),
        ),
        migrations.AddField(
            model_name='travelcommit',
            name='travel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='travel_of_TravelCommit', to='travel.Travel'),
        ),
        migrations.AddField(
            model_name='travelblocklist',
            name='TravelDay',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travel.TravelDay'),
        ),
        migrations.AddField(
            model_name='travel',
            name='head',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='head_of_travel', to='travel.TravelCommit'),
        ),
        migrations.AddField(
            model_name='travel',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='like_of_Travel', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='travel',
            name='views',
            field=models.ManyToManyField(blank=True, related_name='views_of_Travel', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='travelblocklist',
            unique_together={('TravelDay', 'TravelBlock', 'index')},
        ),
    ]
