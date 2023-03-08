from base.views.baseViews import error, response
from base.models import User
from base.serializers import UserSerializer

def checkUsername(username):
    checkUserExist = User.objects.filter(username = username)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def get(request, username):
    if not checkUsername(username):
        return error('Username not found')

    findUser = User.objects.filter(username=username)
    user = User.objects.get(id = findUser[0].id)

    # many=True means we are serializing multiple products, not just one. if one then false
    serializer = UserSerializer(user, many=False)
    return response('User profile retireved', serializer.data)