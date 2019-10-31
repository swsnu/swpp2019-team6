# Generated by Django 2.2.6 on 2019-10-20 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(db_index=True, max_length=50, unique=True)),
                ('nickname', models.CharField(max_length=50)),
                ('register_date', models.DateTimeField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
