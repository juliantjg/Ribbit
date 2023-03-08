from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes

from base.models import UserProfile, User
from base.modules.Auth.Api.Validators import (
    RegisterUserValidator,
    ResetPasswordEmailValidator,
    ResetPasswordValidator,
)
from base.modules.Auth.Api.Actions import (
    RegisterUserAction,
    ResetPasswordEmailAction,
    ResetPasswordAction,
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email

        findUser = UserProfile.objects.get(userId=data['id'])

        data['gravatarURL'] = findUser.gravatarURL
        data.pop('refresh', None)

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    if (RegisterUserValidator.validate(request) != None):
        return RegisterUserValidator.validate(request)
    
    return RegisterUserAction.register(request)

@api_view(['POST'])
def resetPasswordEmail(request):
    if (ResetPasswordEmailValidator.validate(request) != None):
        return ResetPasswordEmailValidator.validate(request)

    return ResetPasswordEmailAction.send(request)

@api_view(['POST'])
def resetPassword(request):
    if (ResetPasswordValidator.validate(request) != None):
        return ResetPasswordValidator.validate(request)

    return ResetPasswordAction.reset(request)