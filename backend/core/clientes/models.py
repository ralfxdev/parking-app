"""Models Clientes."""

# Django
from django.db import models


class Cliente(models.Model):
    """Modelo de Cliente"""
    nombre_completo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_completo
