from base.views.baseViews import error, response
from base.models import Subribbit, SubribbitMember, UserProfile, User
from base.serializers import SubribbitSerializer
from base.traits import NotifyUser
from base.enums import SubribbitMemberStatus

def sendNotification(subribbitOwner, subribbitMember, subribbit, status):
    title = 'Membership status update'
    text = 'u/' + subribbitOwner.username + ' has updated your membership status on r/' + subribbit.name + '. Status: ' + status
    link = '/community/' + str(subribbit.name)
    NotifyUser.send(subribbitMember, title, text, link)

def checkSubribbitId(id):
    checkSubribbitExist = Subribbit.objects.filter(id = id)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def checkUserId(id):
    checkUserExist = User.objects.filter(id = id)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def checkMemberExist(subribbit, userprofile):
    checkSubribbitMemberExist = SubribbitMember.objects.filter(subribbit=subribbit, userprofile=userprofile)

    if len(checkSubribbitMemberExist) > 0:
        return True
    else:
        return False

def updateSubribbitNumMembers(originalStatus, status, subribbit):
    if originalStatus == SubribbitMemberStatus.get.ACCEPTED.value:
        subribbit.numMembers -= 1 
        subribbit.save()
    elif status == SubribbitMemberStatus.get.ACCEPTED.value:
        subribbit.numMembers += 1
        subribbit.save()

def update(request, pk):
    data = request.data
    user = request.user

    if not checkSubribbitId(pk):
        return error('Subribbit ID not found')

    subribbit = Subribbit.objects.get(id=pk)

    if not checkUserId(data['userId']):
        return error('User ID not found')

    userprofile = UserProfile.objects.get(userId=data['userId'])

    if not checkMemberExist(subribbit, userprofile):
        return error('Member does not exist')

    if subribbit.ownerId != user.id:
        return error('Not Subribbit owner')

    subribbitMember = SubribbitMember.objects.get(subribbit=subribbit, userprofile=userprofile)

    originalStatus = subribbitMember.status

    subribbitMember.status = data['status']
    subribbitMember.save()

    if originalStatus != data['status']:
        updateSubribbitNumMembers(originalStatus, data['status'], subribbit)
        sendNotification(user, User.objects.get(id=data['userId']), subribbit, SubribbitMemberStatus.get(data['status']).name)

    return response('Member status updated', [])