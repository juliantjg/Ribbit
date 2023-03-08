from base.models import Post, PostVote
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetSinglePostWithUserVoteStatus

def checkPostId(id):
    checkPostExist = Post.objects.filter(id = id)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def checkHaveVoted(userId, postId):
    checkPostVoteExist = PostVote.objects.filter(userId = userId, postId = postId)

    if len(checkPostVoteExist) > 0:
        return True
    else:
        return False

def read(request, pk):
    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False).data

    copySerializer = dict(serializer)

    returnDictionary = GetSinglePostWithUserVoteStatus.get(copySerializer, request.user)

    # Need to create a copy of the return dictionary because serializer is immutable (cancelled, done in serializers)
    # new_object = dict(serializer.data)
    # new_object['humanTimeDiffCreatedAt'] = humanTimeDiffCreatedAt

    return response('Post retrieved', returnDictionary)