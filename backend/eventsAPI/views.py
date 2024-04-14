from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout as django_logout
from django.core.exceptions import ObjectDoesNotExist
from .token import CustomTokenAuthentcation
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from . import serializers
from django.contrib.auth.models import User
from . import models

# Create your views here.
class LogoutView(APIView):
    authentication_classes = [CustomTokenAuthentcation]
    permission_classes = [IsAuthenticated]

    # @action(detail=False, methods=['POST'])
    def post(self, request):
        try:
            print(request.user)
            # Delete the user's authentication token
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass

        # Perform Django logout
        django_logout(request)

        return Response(status=status.HTTP_200_OK)
    
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EventSerializer
    queryset = models.Event.objects.all()
    filterset_fields = ['postedBy']
    
class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LikeSerializer
    queryset = models.Like.objects.all()
    filterset_fields = ['event', 'likedUser']