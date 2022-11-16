"""Urls Clientes"""

# Django
from django.urls import path
from django.db import router
from .views import ClienteViewSet

# Django Rest Framework
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ClienteViewSet)

urlpatterns = router.urls