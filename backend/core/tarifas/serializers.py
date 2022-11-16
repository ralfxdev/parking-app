"""Serializers Tarifas"""

# Django
from .models import Tarifa

# Django Rest Framework
from rest_framework import serializers

class TarifaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifa
        fields = ('id', 'nombre', 'precio', 'descripcion')