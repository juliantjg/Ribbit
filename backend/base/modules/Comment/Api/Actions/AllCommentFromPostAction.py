from base.views.baseViews import response, error
from base.models import Post, CommentLike
from base.serializers import CommentSerializer

def checkPostId(postId):
    checkPostExist = Post.objects.filter(id = postId)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def checkHaveLiked(userId, commentId):
    checkCommentLikeExist = CommentLike.objects.filter(userId = userId, commentId = commentId)

    if len(checkCommentLikeExist) > 0:
        return True
    else:
        return False

def get(request, postId):
    if not checkPostId(postId):
        return error('Post ID not found')

    post = Post.objects.get(id=postId)
    # Get a post's comments by using object_set.all()
    comments = post.comment_set.all()

    # Reverse comments so the newest will be on top
    reversed = comments[::-1]

    serializedComments = CommentSerializer(reversed, many=True).data
    copySerializedComments = list(serializedComments)

    returnList = []

    for comment in copySerializedComments:
        if request.user != None:
            # If there is an authenticated token given, then show whether or not comment is liked by current user
            user = request.user
            commentCopy = dict(comment)
            if checkHaveLiked(user.id, commentCopy['id']):
                # If user liked this comment
                commentCopy['liked'] = 1
            else:
                commentCopy['liked'] = 0
            
        else:
            # If no authenticated token given, then mark as not yet liked
            commentCopy = dict(comment)
            comment['liked'] = 0

        returnList.append(commentCopy)


    return response('All comments retrieved', returnList)