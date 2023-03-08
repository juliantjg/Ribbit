from base.views.baseViews import response, error
from base.models import Post, Comment, UserProfile, User
from base.traits import NotifyUser
from better_profanity import profanity

def sendNotification(commentCreator, postOwner, message, post):
    if commentCreator.id != postOwner.id:
        title = 'Someone commented on your post'
        text = 'u/' + commentCreator.username + ' commented on your post. Message: ' + message
        link = '/post/' + str(post.id)
        NotifyUser.send(postOwner, title, text, link)

def checkPostId(postId):
    checkPostExist = Post.objects.filter(id = postId)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def mention(post, content, user):
    characters = content.split(' ')
    for i in characters:
        targetUsername = ''
        if len(i) > 1:
            if i[0] == '@':
                targetUsername = i[1:]

                # Check if the mentioned user exist in the database first
                if len(User.objects.filter(username = targetUsername)) > 0:
                    targetUser = User.objects.get(username = targetUsername)

                    # Tagging yourself wouldn't notify
                    if targetUser != user:
                        notificationTitle = 'Someone mentioned you in their comment'
                        notificationMessage = 'User ' + user.username + ' mentioned you in a comment on post: "' + post.title.upper() + '". Message: ' + content
                        link = '/post/' + str(post.id)
                        NotifyUser.send(targetUser, notificationTitle, notificationMessage, link)
                    

def create(request):
    user = request.user
    data = request.data

    data['text'] = profanity.censor(data['text'])

    if not checkPostId(data['postId']):
        return error('Post ID not found')

    post = Post.objects.get(id=data['postId'])

    comment = Comment.objects.create(
        user = user,
        post = post,
        text = data['text'],
    )

    post.numComments = post.numComments + 1
    post.save()

    sendNotification(user, post.user, data['text'], post)
    mention(post, data['text'], user)

    return response('Comment added')