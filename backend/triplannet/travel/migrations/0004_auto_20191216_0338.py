# Generated by Django 2.2.6 on 2019-12-16 03:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0003_comment_register_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelcommit',
            name='travel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='travelCommits', to='travel.Travel'),
        ),
    ]
