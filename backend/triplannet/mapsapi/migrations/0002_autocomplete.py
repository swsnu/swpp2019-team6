# Generated by Django 2.2.6 on 2019-12-04 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mapsapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutoComplete',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('search_index', models.SmallIntegerField(null=True)),
                ('description', models.CharField(max_length=200)),
                ('structured_formatted', models.TextField(null=True)),
                ('place_id', models.CharField(max_length=50)),
                ('query', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mapsapi.Query')),
            ],
        ),
    ]
