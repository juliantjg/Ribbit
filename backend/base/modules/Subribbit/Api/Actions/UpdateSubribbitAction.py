from base.views.baseViews import error, response
from base.models import Subribbit
from base.serializers import SubribbitSerializer
from better_profanity import profanity

def checkSubribbitId(id):
    checkSubribbitExist = Subribbit.objects.filter(id = id)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def update(request, pk):
    data = request.data

    data['description'] = profanity.censor(data['description'])

    if not checkSubribbitId(pk):
        return error('Subribbit ID not found')

    subribbit = Subribbit.objects.get(id=pk)
    subribbit.description = data['description']
    subribbit.type = data['type']
    subribbit.save()

    serializer = SubribbitSerializer(subribbit, many=False)

    return response('Subribbit updated successfully', serializer.data)