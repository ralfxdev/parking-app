"""Serializers Vehiculo."""

# Django
from .models import Vehiculo
from clientes.models import Cliente
from clientes.serializers import ClienteSerializer
from tarifas.models import Tarifa
from tarifas.serializers import TarifaSerializer

# Django Rest Framework
from rest_framework import serializers


class VehiculoSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Cliente.objects.all(), source='cliente')
    tarifa = TarifaSerializer(read_only=True)
    tarifa_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Tarifa.objects.all(), source='tarifa')
    class Meta:
        model = Vehiculo
        fields = ('id', 'placa', 'marca', 'modelo', 'color', 'vehiculo_status', 'cliente', 'cliente_id', 'tarifa', 'tarifa_id')
        
