import datetime
from django.db import models


# Create your models here.
class WorkSpace(models.Model):
	fixed_jumps = models.CharField('Фиксированный шаг', max_length=200)
	random_jumps = models.CharField('Произвольные шаги', max_length=200)
	code_input = models.TextField('Напишите код программы')


class Session(models.Model):
	session_id = models.AutoField(primary_key=True, null=False)
	name = models.CharField('Новый проект %s' % session_id, max_length=200, null=False, default='')
	kuz_place = models.IntegerField(default=0, null=False)
	code = models.TextField(null=False, default='')
	creationDate = models.DateTimeField(default=datetime.datetime.now())
