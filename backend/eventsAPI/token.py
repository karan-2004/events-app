from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .serializers import MyAuthTokenSerializer
from django.forms.models import model_to_dict
import json

class CustomAuthToken(ObtainAuthToken):
    serializer_class =  MyAuthTokenSerializer   

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
            'token': token.key,
            'user_id': model_to_dict(user),
        }
        )
    
class CustomTokenAuthentcation(TokenAuthentication):
        def authenticate(self, request):
            # Check if 'auth_token' is in the request cookies.
            # Give precedence to 'Authorization' header.
            if 'auth_token' in request.COOKIES and \
                            'HTTP_AUTHORIZATION' not in request.META:
                return self.authenticate_credentials(
                    request.COOKIES.get('auth_token')
                )
            return super().authenticate(request)
    
