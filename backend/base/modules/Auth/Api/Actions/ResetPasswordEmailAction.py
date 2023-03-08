from base.models import User, UserProfile
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer
from base.mail.AuthMail import resetPasswordEmailSent
from base.enums import Utilities

import string
import random
from datetime import datetime, timezone

def generateToken(userId, size=10):
    randomString = (string.ascii_lowercase + string.digits)
    token = ''
    for i in range(0, size): 
        token += random.choice(randomString)
    
    return str(userId) + 'R' + token

def send(request):
    data = request.data
    if len(User.objects.filter(email = data['email'])) < 1:
        return response('A reset password email has been sent to your email if your email is registered in our systems')
    
    user                       = User.objects.get(email = data['email'])
    token                      = generateToken(user.id)
    resetTokenUrl              = Utilities.get.FRONTEND_URL.value + 'resetPassword/' + token
    userProfile                = UserProfile.objects.get(userId = user.id)
    userProfile.resetToken     = token
    userProfile.resetTokenTime = datetime.now(timezone.utc)
    userProfile.save()

    resetPasswordEmailSent(
        resetTokenUrl,
        user.email
    )

    return response('A reset password email has been sent to your email if your email is registered in our systems')

