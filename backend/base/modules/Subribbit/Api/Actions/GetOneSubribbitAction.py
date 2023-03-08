from base.views.baseViews import error, response
from base.models import Subribbit
from base.serializers import SubribbitSerializer

def checkSubribbitId(id):
    checkSubribbitExist = Subribbit.objects.filter(id = id)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def get(request, pk):
    if not checkSubribbitId(pk):
        return error('Subribbit ID not found')
        
    subribbits = Subribbit.objects.get(pk=pk)

    serializer = SubribbitSerializer(subribbits, many=False)
    return response('Subribbit fetched successfully', serializer.data)
