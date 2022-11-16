"""Models Tarifas"""

# Django
from django.db import models


class Tarifa(models.Model):
    """Modelo de Tarifa"""
    nombre = models.CharField(max_length=255)
    precio = models.FloatField()
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
