"""Urls Vehiculos"""

# Django
from django.urls import path
from django.db import router
from .views import VehiculoViewSet

# Django Rest Framework
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', VehiculoViewSet)

urlpatterns = router.urls