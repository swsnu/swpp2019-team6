# Generated by Django 2.2.6 on 2019-11-26 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0004_remove_travelcommit_photo'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='travel',
            options={'ordering': ['-last_modified_time']},
        ),
        migrations.AlterModelOptions(
            name='travelblocklist',
            options={'ordering': ['TravelDay', 'TravelBlock', 'index']},
        ),
        migrations.AlterModelOptions(
            name='traveldaylist',
            options={'ordering': ['TravelCommit', 'TravelDay', 'index']},
        ),
        migrations.AddField(
            model_name='travelday',
            name='parent_day',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='child_day', to='travel.TravelDay'),
        ),
        migrations.AlterField(
            model_name='travelblock',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]