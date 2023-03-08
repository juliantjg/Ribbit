from base.views.baseViews import error, response
from base.models import Subribbit, SubribbitMember, UserProfile
from base.serializers import GetAllSubribbitSerializer
from base.enums import SubribbitMemberStatus

def get(request):
    user = request.user
    ownedSubribbits = Subribbit.objects.filter(ownerId = user.id)
    
    userprofile = UserProfile.objects.get(userId = user.id)
    findJoinedSubribbits = SubribbitMember.objects.filter(userprofile = userprofile, status=SubribbitMemberStatus.get.ACCEPTED.value)

    for eachSubribbit in findJoinedSubribbits:
        ownedSubribbits = ownedSubribbits | Subribbit.objects.filter(id = eachSubribbit.subribbit.id)

    serializer = GetAllSubribbitSerializer(ownedSubribbits, many=True)
    return response('Subribbit list fetched successfully', serializer.data)
