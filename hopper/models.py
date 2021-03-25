from django.db import models

# Create your models here.
class Hopper(models.Model):
	jumps_counter = models.IntegerField(default=0)
	jumps_forward = models.IntegerField(default=0)
	jumps_backward = models.IntegerField(default=0)

	def __str__(self):
		return self.jumps_counter