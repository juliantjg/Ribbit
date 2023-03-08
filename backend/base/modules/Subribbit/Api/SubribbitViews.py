from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.Subribbit.Api.Validators import (
    CreateSubribbitValidator,
    UpdateSubribbitValidator,
    ChangeSubribbitMemberStatusValidator,
)
from base.modules.Subribbit.Api.Actions import (
    CreateSubribbitAction,
    GetAllSubribbitAction,
    GetTopSubribbitsAction,
    UpdateSubribbitAction,
    RequestJoinSubribbitAction,
    GetSubribbitMembersAction,
    GetSubribbitMembersForModAction,
    ChangeSubribbitMemberStatusAction,
    GetOneSubribbitAction,
    GetOneSubribbitWithNameAction,
    GetJoinedAndOwnedSubribbitsAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    if (CreateSubribbitValidator.validate(request) != None):
        return CreateSubribbitValidator.validate(request)

    return CreateSubribbitAction.create(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all(request):
    return GetAllSubribbitAction.get(request)

@api_view(['GET'])
def one(request, pk):
    return GetOneSubribbitAction.get(request, pk)

@api_view(['GET'])
def getTopSubribbits(request, limit):
    return GetTopSubribbitsAction.get(request, limit)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getJoinedAndOwned(request):
    return GetJoinedAndOwnedSubribbitsAction.get(request)

@api_view(['GET'])
def getSubribbitWithName(request, name):
    return GetOneSubribbitWithNameAction.get(request, name)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, pk):
    if (UpdateSubribbitValidator.validate(request) != None):
        return UpdateSubribbitValidator.validate(request)

    return UpdateSubribbitAction.update(request, pk)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestJoin(request, pk):
    return RequestJoinSubribbitAction.send(request, pk)

@api_view(['GET'])
def showMembers(request, pk):
    return GetSubribbitMembersAction.get(request, pk)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showMembersForMod(request, pk):
    return GetSubribbitMembersForModAction.get(request, pk)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def changeMemberStatus(request, pk):
    if (ChangeSubribbitMemberStatusValidator.validate(request) != None):
        return ChangeSubribbitMemberStatusValidator.validate(request)

    return ChangeSubribbitMemberStatusAction.update(request, pk)
