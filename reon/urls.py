"""super URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from rest_framework import routers
from django.urls import re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView

from main.api import RegisterAPI, LoginAPI, UserAPI
from django.conf import settings
from django.conf.urls.static import static
from knox import views as knox_views

# Main app views
from main import views
# Teacher app views
from teachers import api as teacher_views

router = routers.DefaultRouter()
router.register(r"profiles", views.UserProfileViewSet)


urlpatterns = [

    path("admin/", admin.site.urls),
    path("/", TemplateView.as_view(template_name="index.html")),
    path("restauth/", include("rest_framework.urls", namespace="restauth")),
    path("api/", include(router.urls)),
    path("api/", include("teachers.urls")),

    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path("api/auth/user", UserAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path(
        "api/password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    url(r"^(?:.*)/?$", TemplateView.as_view(template_name="index.html")),

    # path(
    #     "passwordreset/verifytoken/",
    #     views.CustomPasswordTokenVerificationView.as_view(),
    #     name="password_reset_verify_token",
    # ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
