from base.views.baseViews import response, error
from base.models import CommentLike, Comment, Post
from base.traits import NotifyUser

def sendNotification(likeCreator, commentOwner, comment, post):
    if likeCreator.id != commentOwner.id:
        title = 'Someone liked your comment'
        text = 'u/' + likeCreator.username + ' liked your comment: ' + comment
        link = '/post/' + str(post.id)
        NotifyUser.send(commentOwner, title, text, link)

def checkHaveLiked(userId, commentId):
    checkCommentLikeExist = CommentLike.objects.filter(userId = userId, commentId = commentId)

    if len(checkCommentLikeExist) > 0:
        return True
    else:
        return False

def set(request):
    user = request.user
    data = request.data

    if checkHaveLiked(user.id, data['commentId']):
        # This is if user has indeed liked the given comment
        # Then unlike it by deleting the like record
        findRecord = CommentLike.objects.filter(userId = user.id, commentId = data['commentId'])
        commentLikeId = findRecord[0].id
        commentLikeRecord = CommentLike.objects.get(id = commentLikeId)
        commentLikeRecord.delete()
        return response('Comment unliked')
    else:
        # This is if user has not liked this comment
        # Then like it by creating a like record
        commentLike = CommentLike.objects.create(
            userId = user.id,
            commentId = data['commentId'],
        )

        comment = Comment.objects.get(id=data['commentId'])
        post = comment.post
        sendNotification(user, comment.user, comment.text, post)

        return response('Comment liked')