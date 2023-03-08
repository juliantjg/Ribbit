from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.Comment.Api.Validators import (
    CreateCommentValidator,
    LikeUnlikeCommentValidator,
)
from base.modules.Comment.Api.Actions import (
    CreateCommentAction,
    AllCommentFromPostAction,
    DeleteCommentAction,
    LikeUnlikeCommentAction,
    GetLikedRecordAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request):
    if (CreateCommentValidator.validate(request) != None):
        return CreateCommentValidator.validate(request)

    return CreateCommentAction.create(request)

@api_view(['GET'])
def allCommentFromPost(request, postId):
    return AllCommentFromPostAction.get(request, postId)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, commentId):
    return DeleteCommentAction.delete(request, commentId)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def likeUnlike(request):
    if (LikeUnlikeCommentValidator.validate(request) != None):
        return LikeUnlikeCommentValidator.validate(request)

    return LikeUnlikeCommentAction.set(request)

@api_view(['GET'])
def getLikeRecord(request):
    return GetLikedRecordAction.get(request)
