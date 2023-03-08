from base.models import Post, Subribbit, SubribbitMember, UserProfile, User
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import NotifyUser
from better_profanity import profanity

def sendNotification(postCreator, subribbitOwner, subribbitName, subribbit):
    if postCreator.id != subribbitOwner.id:
        title = 'New post on your Subribbit'
        text = 'u/' + postCreator.username + ' has just posted on your Subribbit r/' + subribbitName 
        link = '/community/' + str(subribbit.name)
        NotifyUser.send(subribbitOwner, title, text, link)

def checkSubribbitExist(subribbitName):
    checkSubribbitExist = Subribbit.objects.filter(name = subribbitName)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def checkUserIsInSubribbit(user, subribbit):
    if subribbit.ownerId == user.id:
        return True

    userprofile = UserProfile.objects.get(userId = user.id)
    checkMemberExist = SubribbitMember.objects.filter(userprofile = userprofile, subribbit = subribbit)

    if len(checkMemberExist) > 0:
        return True
    else:
        return False

def create(request):
    user = request.user
    data = request.data

    data['title'] = profanity.censor(data['title'])
    data['content'] = profanity.censor(data['content'])

    if data['subribbit'] != 'home':
        if not checkSubribbitExist(data['subribbit']):
            return error('Subribbit name not found')

        subribbit = Subribbit.objects.get(name=data['subribbit'])

        if not checkUserIsInSubribbit(user, subribbit):
            return error('You are not assigned into this subribbit')

    post = Post.objects.create(
        user = user,
        title = data['title'],
        content = data['content'],
        nsfw = data['nsfw'],
        subRibbit = data['subribbit'],
    )

    userProfile = UserProfile.objects.get(userId = user.id)
    userProfile.numPosts += 1
    userProfile.save()
    
    serializer = PostSerializer(post, many=False)

    if data['subribbit'] != 'home':
        subribbit = Subribbit.objects.get(name=data['subribbit'])
        sendNotification(post.user, User.objects.get(id=subribbit.ownerId), subribbit.name, subribbit)

    return response('Post created', serializer.data)