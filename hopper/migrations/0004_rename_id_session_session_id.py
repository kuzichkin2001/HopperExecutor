# Generated by Django 3.2 on 2021-05-12 17:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hopper', '0003_alter_session_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='session',
            old_name='id',
            new_name='session_id',
        ),
    ]