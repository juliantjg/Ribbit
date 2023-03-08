from base.models import SubribbitMember, Subribbit, UserProfile
from base.enums import SubribbitMemberStatus

def checkHaveJoined(user, subribbitId):
    subribbit = Subribbit.objects.get(id = subribbitId)
    userprofile = UserProfile.objects.get(userId = user.id)
    checkMemberExist = SubribbitMember.objects.filter(userprofile = userprofile, subribbit = subribbit)

    if len(checkMemberExist) > 0:
        return True
    else:
        return False

def get(subribbit, user):
    subribbitCopy = dict(subribbit)

    if user.id != None:
        userprofile = UserProfile.objects.get(userId = user.id)
        subribbit = Subribbit.objects.get(id = subribbitCopy['id'])

        if checkHaveJoined(user, subribbitCopy['id']):
            userGroupStatus = SubribbitMember.objects.get(userprofile = userprofile, subribbit = subribbit)

            subribbitCopy['currentUserStatus'] = SubribbitMemberStatus.get(userGroupStatus.status).name
        else:
            if subribbit.ownerId == user.id:
                subribbitCopy['currentUserStatus'] = 'OWNER'
            else:
                subribbitCopy['currentUserStatus'] = 'NOT JOINED'
    else:
        subribbitCopy['currentUserStatus'] = 'UNAUTHENTICATED'

    return subribbitCopy