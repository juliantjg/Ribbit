from base.views.baseViews import response, error
from base.models import User, UserProfile
from base.serializers import UserSerializer
from base.traits import CreateGravatar, NotifyUser
from django.contrib.auth.hashers import make_password
from base.mail.AuthMail import userRegistered

def sendNotification(user):
    title = 'Welcome to Ribbit!'
    text = 'Congratulations on creating your account, ' + user.username + '! You can now access user only features such as creating posts, joining Subribbits, and more. Enjoy.'
    NotifyUser.send(user, title, text)

def register(request):
    data = request.data

    gravatarURL = CreateGravatar.create(str(data['email']))

    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )

    profile = UserProfile.objects.create(
        userId = user.id,
        gravatarURL = gravatarURL
    )

    sendNotification(user)

    userRegistered(
        user.username,
        user.email
    )

    serializer = UserSerializer(user, many=False)
    return response('Registration successful. A welcome email has been sent to your address.', serializer.data)