from django.db import models

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=255)
    empid = models.IntegerField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
