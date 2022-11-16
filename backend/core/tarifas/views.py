"""Views Tarifas"""

# Django
from django.shortcuts import render
from .serializers import TarifaSerializer
from .models import Tarifa

# Django Rest Framework
from rest_framework.views import Response
from rest_framework import viewsets

class TarifaViewSet(viewsets.ModelViewSet):
    queryset = Tarifa.objects.all()
    serializer_class = TarifaSerializer

    def create(self, request, *args, **kwargs):
        tarifa = Tarifa(
            nombre = request.data['nombre'],
            precio = request.data['precio'],
            descripcion = request.data['descripcion']
        )
        tarifa.save()
        return Response({'detail': 'Tarifa creada'}, status=201)

    def destroy(self, request, *args, **kwargs):
        tarifa = self.get_object()
        tarifa.delete()
        return Response({'detail': 'Tarifa eliminada'}, status=204)

    def update(self, request, *args, **kwargs):
        tarifa = self.get_object()
        tarifa.nombre = request.data['nombre']
        tarifa.precio = request.data['precio']
        tarifa.descripcion = request.data['descripcion']
        tarifa.save()
        return Response({'detail': 'Tarifa actualizada'}, status=200)
    
    
