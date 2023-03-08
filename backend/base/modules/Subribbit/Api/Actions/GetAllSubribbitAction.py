from base.views.baseViews import error, response
from base.models import Subribbit
from base.serializers import GetAllSubribbitSerializer
from base.traits import GetSubribbitsWithUserJoinStatus

def search(request):
    searchValue = ''
    if request.GET.get('search') != None:
        searchValue = request.GET.get('search', '')

    if searchValue != '':
        return Subribbit.objects.filter(name__icontains = searchValue).order_by('-createdAt')
    else:
        return Subribbit.objects.all().order_by('-createdAt')

def get(request):
    user = request.user

    subribbits = search(request)
    
    serializer = GetAllSubribbitSerializer(subribbits, many=True).data
    copySerializedSubribbits = list(serializer)

    returnSubribbit = GetSubribbitsWithUserJoinStatus.get(copySerializedSubribbits, user)

    return response('Subribbit list fetched successfully', returnSubribbit)
