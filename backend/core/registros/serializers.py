"""Serializers Registro."""

# Django
from pkg_resources import require
from .models import Registro
from vehiculos.models import Vehiculo
from vehiculos.serializers import VehiculoSerializer

# Django Rest Framework
from rest_framework import serializers


class RegistroSerializer(serializers.ModelSerializer):
    vehiculo = VehiculoSerializer(read_only=True)
    vehiculo_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Vehiculo.objects.all(), source='vehiculo')
    fecha_ingreso = serializers.DateTimeField(read_only=True, format='%Y-%m-%d %H:%M:%S')
    fecha_salida = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)
    tiempo_total = serializers.DurationField(required=False, read_only=True, source = 'calc_tiempo_total')
    total_pagar = serializers.FloatField(required=False, read_only=True, source = 'calc_total_pagar')
    pago_status = serializers.BooleanField(required=False)
    class Meta:
        model = Registro
        fields = ('id', 'vehiculo', 'vehiculo_id', 'fecha_ingreso', 'fecha_salida','tiempo_total', 'total_pagar', 'pago_status')


    def calc_tiempo_total(self, obj):
        if not obj.fecha_salida:
            return None
        return obj.fecha_salida - obj.fecha_ingreso

    def calc_total_pagar(self, obj):
        if not obj.tiempo_total:
            return None
        return round(obj.tiempo_total.total_seconds() / 60 * obj.vehiculo.tarifa.precio, 2)

    def update(self, instance, validated_data):
        instance.fecha_salida = validated_data.get('fecha_salida', instance.fecha_salida)
        instance.pago_status = validated_data.get('pago_status', instance.pago_status)
        instance.save()
        return instance
