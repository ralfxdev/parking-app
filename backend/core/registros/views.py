"""Views Vehiculo"""

# Django
from time import strptime
from django.shortcuts import render
from .serializers import RegistroSerializer
from .models import Registro
from vehiculos.serializers import VehiculoSerializer
from vehiculos.models import Vehiculo

# Django Rest Framework
from rest_framework.views import Response
from rest_framework import viewsets


class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

    def create(self, request, *args, **kwargs):
        registro = Registro (
            vehiculo = Vehiculo.objects.get(pk=request.data['vehiculo_id']),
        )
        registro.save()
        return Response({'detail': 'Registro creado'}, status=201)
