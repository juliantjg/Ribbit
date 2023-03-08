from base.views.baseViews import error, response
from base.models import Subribbit, SubribbitMember
from base.serializers import SubribbitAcceptedMemberSerializer
from base.enums import SubribbitMemberStatus

def checkSubribbitId(id):
    checkSubribbitExist = Subribbit.objects.filter(id = id)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def get(request, pk):
    user = request.user

    if not checkSubribbitId(pk):
        return error('Subribbit ID not found')

    subribbit = Subribbit.objects.get(id=pk)
    members = SubribbitMember.objects.filter(subribbit=subribbit, status=SubribbitMemberStatus.get.ACCEPTED.value)

    serializer = SubribbitAcceptedMemberSerializer(members, many=True)
    return response('Subribbit accepted members fetched successfully', serializer.data)
