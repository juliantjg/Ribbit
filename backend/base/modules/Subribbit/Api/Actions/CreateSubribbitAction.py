from base.views.baseViews import error, response
from base.models import Subribbit
from base.serializers import SubribbitSerializer
from better_profanity import profanity

def checkNameExist(name):
    checkNameExist = Subribbit.objects.filter(name = name)

    if len(checkNameExist) > 0:
        return True
    else:
        return False

def create(request):
    data = request.data
    user = request.user

    data['description'] = profanity.censor(data['description'])

    if checkNameExist(data['name']):
        return error('Subribbit name taken')

    subribbit = Subribbit.objects.create(
        name = data['name'],
        description = data['description'],
        ownerId = user.id,
        type = data['type'],
    )

    serializer = SubribbitSerializer(subribbit, many=False)

    return response('Subribbit created successfully', serializer.data)