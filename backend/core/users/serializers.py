"""Serializers users"""

# Django
from .models import User

# Django Rest Framework
from rest_framework import serializers


"""
La clase UserSerializer es un ModelSerializer que serializa el modelo de User.

La clase Meta le dice al serializador que debería estar usando el modelo de User.

El atributo de fields le dice al serializador qué campos usar.

El atributo extra_kwargs le dice al serializador que el campo de contraseña debe ser de solo escritura.

El método de create se utiliza para crear un nuevo usuario.

El argumento de validated_data es un diccionario de los datos validados.

La contraseña se extrae del diccionario de validated_data.

La variable instance se establece en el modelo de Usuario.

Si la contraseña no es None, se establece la contraseña.

La instancia se guarda y se devuelve
"""


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'email', 'password', 'is_superuser')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
