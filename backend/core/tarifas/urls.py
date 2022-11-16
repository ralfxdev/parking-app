"""Urls Tarifas"""

# Django
from django.urls import path
from django.db import router
from .views import TarifaViewSet

# Django Rest Framework
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', TarifaViewSet)

urlpatterns = router.urls