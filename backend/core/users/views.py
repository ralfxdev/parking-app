"""Views users"""

# Django
from .serializers import UserSerializer
from .models import User

# Django Rest Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import viewsets

# Utils
import jwt
import datetime


"""
La clase RegisterView hereda de la clase APIView y define un método POST que toma un
request object como argumento. El método POST luego crea un objeto UserSerializer, pasando el
request data. Luego se valida el serializador y, si es válido, el serializador guarda los datos.
Finalmente, se devuelven los datos del serializador.
"""


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


"""
Es una vista que recibe una solicitud POST con un correo electrónico y una contraseña,
verifica si el usuario existe y si la contraseña es correcta y, de ser así, devuelve un token JWT.
"""


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('¡El usuario no existe!')

        if not user.check_password(password):
            raise AuthenticationFailed('¡Credenciales Inválidas!')

        """
        Crear un payload con la identificación del usuario, el tiempo de vencimiento y la hora en que se creó.
        Luego está codificando el payload con una clave secreta y un algoritmo.
        Finalmente, está configurando la cookie con el token y devolviendo la respuesta.
        """

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=510),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


"""Si el usuario está autenticado, devolver los datos del usuario"""


class UserView(APIView):
    def get(self, request):
        """Obtener el token de la cookie."""
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('¡Sin autenticar!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('¡Sin autenticar!')

        """
        Obtener el usuario de la base de datos usando la identificación del payload. Entonces está creando un
        serializador con el usuario y devolviendo los datos del serializador.
        """

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


"""
Esta clase es una subclase de APIView y tiene un método de publicación que elimina
la cookie jwt y devuelve una respuesta con un mensaje.
"""


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'éxito'
        }
        return response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({'detail': 'Usuario eliminado'}, status=204)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.name = request.data['name']
        user.username = request.data['username']
        user.email = request.data['email']
        user.password = request.data['password']
        user.is_superuser = request.data['is_superuser']
        user.save()
        return Response({'detail': 'Tarifa actualizada'}, status=200)
