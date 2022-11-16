"""Models Vehiculos"""

# Django
from django.db import models
from clientes.models import Cliente
from tarifas.models import Tarifa

class Vehiculo(models.Model):
    """Modelo de Vehiculo"""
    placa = models.CharField(max_length=255)
    marca = models.CharField(max_length=255)
    modelo = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    tarifa = models.ForeignKey(Tarifa, on_delete=models.CASCADE)
    vehiculo_status = models.BooleanField(default=True)

    def __str__(self):
        return self.placa