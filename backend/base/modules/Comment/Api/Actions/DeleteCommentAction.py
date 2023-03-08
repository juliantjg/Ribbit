from base.views.baseViews import response, error
from base.models import Comment, UserProfile

def checkCommentId(commentId):
    checkCommentExist = Comment.objects.filter(id = commentId)

    if len(checkCommentExist) > 0:
        return True
    else:
        return False

def delete(request, commentId):
    user = request.user

    if not checkCommentId(commentId):
        return error('Comment ID not found')

    comment = Comment.objects.get(id=commentId)

    if user.id != comment.user.id:
        return error('Can only delete your own comments')

    post = comment.post
    post.numComments = post.numComments -1
    post.save()

    comment.delete()

    return response('Comment deleted')