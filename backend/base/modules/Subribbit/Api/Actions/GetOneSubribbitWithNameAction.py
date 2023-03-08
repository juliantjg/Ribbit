from base.views.baseViews import error, response
from base.models import Subribbit
from base.serializers import SubribbitSerializer
from base.traits import GetOneSubribbitWithUserJoinStatus

def checkSubribbitId(name):
    checkSubribbitExist = Subribbit.objects.filter(name = name)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def get(request, name):
    user = request.user

    if name == 'home':
        return response('Home fetched')

    if not checkSubribbitId(name):
        return error('Subribbit name not found')

    subribbits = Subribbit.objects.get(name=name)

    serializer = SubribbitSerializer(subribbits, many=False).data
    returnSubribbit = GetOneSubribbitWithUserJoinStatus.get(serializer, user)

    return response('Subribbit fetched successfully', returnSubribbit)
