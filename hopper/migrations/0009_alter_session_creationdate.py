# Generated by Django 4.2.1 on 2023-05-31 22:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hopper', '0008_alter_session_creationdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='creationDate',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 31, 17, 32, 35, 563800)),
        ),
    ]
