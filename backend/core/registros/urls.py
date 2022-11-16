"""Urls Registros."""

# Django
from django.urls import path
from django.db import router
from .views import RegistroViewSet

# Django Rest Framework
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', RegistroViewSet)

urlpatterns = router.urls