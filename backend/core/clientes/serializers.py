"""Serializers Clientes."""

# Django
from asyncore import read, write
from .models import Cliente

# Django Rest Framework
from rest_framework import serializers


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id', 'nombre_completo', 'telefono', 'direccion')
