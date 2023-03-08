from base.models import User
from base.views.baseViews import error, response

def checkUsernameExist(currentUsername, username):
    if currentUsername == username:
        return False
    
    usernameExist = User.objects.filter(username = username)
    if len(usernameExist) > 0:
        return True
    return False

def update(request):
    data = request.data
    user = request.user

    if checkUsernameExist(user.username, data['username']):
        return error('Username taken')

    user.username = data['username']
    user.save()

    return response('User updated')