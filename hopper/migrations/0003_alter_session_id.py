# Generated by Django 3.2 on 2021-05-12 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hopper', '0002_auto_20210512_1940'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
