from django import urls
from rest_framework.routers import SimpleRouter
from django.urls import path
from .token import CustomAuthToken
from . import views

router = SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'likes', views.LikeViewSet)

urlpatterns = [
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('logout/', views.LogoutView.as_view())
]

urlpatterns += router.urls