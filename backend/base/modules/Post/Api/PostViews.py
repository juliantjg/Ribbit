from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.Post.Api.Validators import (
    CreatePostValidator,
    UpdatePostValidator,
)
from base.modules.Post.Api.Actions import (
    CreatePostAction,
    ReadPostAction,
    UpdatePostAction,
    ShowAllPostAction,
    DeletePostAction,
    GetUserPostAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    if (CreatePostValidator.validate(request) != None):
        return CreatePostValidator.validate(request)

    return CreatePostAction.create(request)

@api_view(['GET'])
def readPost(request, pk):
    return ReadPostAction.read(request, pk)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, pk):
    if (UpdatePostValidator.validate(request) != None):
        return UpdatePostValidator.validate(request)

    return UpdatePostAction.update(request, pk)

@api_view(['GET'])
def showAllPost(request, sub):
    return ShowAllPostAction.show(request, sub)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, pk):
    return DeletePostAction.delete(request, pk)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserPost(request, username):
    return GetUserPostAction.get(request, username)
