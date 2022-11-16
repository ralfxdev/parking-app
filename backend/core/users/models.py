"""Models users"""

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser

"""
Estamos creando una nueva clase llamada User que hereda de AbstractUser.
Entonces estamos anulando los campos de username, nombre y apellido para que sean Ninguno.
También estamos anulando USERNAME_FIELD para que sea un correo electrónico
y REQUIRED_FIELDS para que sea una lista vacía
"""


class User(AbstractUser):
    """Modelo de usuario"""
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    first_name = None
    last_name = None

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
