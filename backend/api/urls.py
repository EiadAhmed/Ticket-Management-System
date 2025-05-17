"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import UserViewSet, CreateUserView, LoginView, LogoutView
from ticket.views import TicketViewSet
from message.views import MessageViewSet
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'users',    UserViewSet,    basename='user')
router.register(r'tickets',  TicketViewSet,  basename='ticket')
router.register(r'messages', MessageViewSet, basename='message')


def hello_view(request):
    return HttpResponse("Hello")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', CreateUserView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('admin/', admin.site.urls),
    path('', hello_view),
]
