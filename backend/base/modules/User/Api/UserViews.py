from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import User
from base.serializers import UserSerializer
from base.modules.User.Api.Validators import (
    UpdateMyProfileValidator,
)
from base.modules.User.Api.Actions import (
    GetProfileAction,
    UpdateMyProfileAction,
)

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    # many=True means we are serializing multiple products, not just one. if one then false
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProfile(request, username):
    return GetProfileAction.get(request, username)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateMyProfile(request):
    if (UpdateMyProfileValidator.validate(request) != None):
        return UpdateMyProfileValidator.validate(request)

    return UpdateMyProfileAction.update(request)
