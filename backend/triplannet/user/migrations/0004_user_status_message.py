# Generated by Django 2.2.6 on 2019-10-20 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20191020_0640'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='status_message',
            field=models.TextField(blank=True),
        ),
    ]
