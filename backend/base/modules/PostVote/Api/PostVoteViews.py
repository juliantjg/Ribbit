from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.PostVote.Api.Validators import (
    VotePostValidator,
)
from base.modules.PostVote.Api.Actions import (
    VotePostAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def votePost(request):
    if (VotePostValidator.validate(request) != None):
        return VotePostValidator.validate(request)

    return VotePostAction.vote(request)
