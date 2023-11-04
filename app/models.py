from django.db import models


class Pizza(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    image = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    