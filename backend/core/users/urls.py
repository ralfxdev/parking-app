"""Urls users"""

# Django
from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, UserViewSet

# Django Rest Framework
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = router.urls

# Una lista de patrones de URL que Django verificará.
urlpatterns += [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
]
