# Generated by Django 3.2 on 2021-05-12 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hopper', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kuz_place', models.IntegerField()),
                ('code', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='WorkSpace',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fixed_jumps', models.CharField(max_length=200, verbose_name='Фиксированный шаг')),
                ('random_jumps', models.CharField(max_length=200, verbose_name='Произвольные шаги')),
                ('code_input', models.TextField(verbose_name='Напишите код программы')),
            ],
        ),
        migrations.DeleteModel(
            name='Hopper',
        ),
    ]
