from contextlib import nullcontext
from base.models import User, UserProfile
from base.views.baseViews import response, error
from django.contrib.auth.hashers import make_password
from base.serializers import UserSerializer

import string
import random
from datetime import datetime, timezone

def reset(request):
    data = request.data

    if 'R' not in data['token']:
        return error('Invalid token')

    tokenString = data['token'].split('R')
    userId = tokenString[0]
    token = tokenString[1]

    if not userId.isdigit():
        return error('Invalid token') 
    
    if len(User.objects.filter(id = userId)) < 1:
        return error('Invalid token')
    
    if len(UserProfile.objects.filter(userId = userId)) < 1:
        return error('Invalid token')
    
    user = User.objects.get(id = userId)
    userProfile = UserProfile.objects.get(userId = user.id)

    if userProfile.resetToken != data['token']:
        return error('Invalid token')

    timeNow = datetime.now(timezone.utc)
    timeTokenWasCreated = userProfile.resetTokenTime
    timeDifference = (timeNow - timeTokenWasCreated).seconds

    if timeDifference > 120:
        return error('Token expired')

    user.password = make_password(data['password'])
    user.save()

    userProfile.resetToken = ''
    userProfile.resetTokenTime = None
    userProfile.save()

    return response('Password changed successfully')
    

