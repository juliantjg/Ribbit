from base.views.baseViews import error, response
from base.models import Subribbit, SubribbitMember
from base.serializers import GetAllSubribbitSerializer
from base.enums import SubribbitMemberStatus

def get(request, limit):
    if limit == 'all':
        subribbits = Subribbit.objects.all().order_by('-numMembers', '-createdAt')
    else:
        subribbits = Subribbit.objects.all().order_by('-numMembers', '-createdAt')[:int(limit)]
    
    serializer = GetAllSubribbitSerializer(subribbits, many=True)
    return response('Top Subribbits retrieved', serializer.data)
