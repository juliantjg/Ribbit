from http.client import ACCEPTED
from base.views.baseViews import error, response
from base.models import Subribbit, SubribbitMember, UserProfile, User
from base.enums import SubribbitMemberStatus, SubribbitTypes
from base.traits import NotifyUser

def sendNotification(subribbitOwner, subribbitRequestMember, subribbit):
    if subribbit.type == SubribbitTypes.get.PRIVATE.value:
        title = 'New membership request'
        text = 'u/' + subribbitRequestMember.username + ' has requested to join your private Subribbit r/' + subribbit.name
    else:
        title = 'Someone joined your Subribbit'
        text = 'u/' + subribbitRequestMember.username + ' has joined your public Subribbit r/' + subribbit.name
    link = '/community/' + str(subribbit.name)
    NotifyUser.send(subribbitOwner, title, text, link)

def checkSubribbitId(pk):
    checkSubribbitExist = Subribbit.objects.filter(id = pk)

    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def checkSubribbitMemberStatus(subribbit, userProfile):
    checkExist = SubribbitMember.objects.filter(subribbit = subribbit, userprofile = userProfile)

    if len(checkExist) > 0:
        return checkExist[0].status

    else:
        # return -1 if no subribbit-member record exist
        return -1

def send(request, pk):
    data = request.data
    user = request.user

    userProfile = UserProfile.objects.get(userId = user.id)

    if not checkSubribbitId(pk):
        return error('Subribbit ID not found')

    subribbit = Subribbit.objects.get(id = pk)

    if user.id == subribbit.ownerId:
        return error('You cannot request to join your own subribbit')

    checkMemberStatus = checkSubribbitMemberStatus(subribbit, userProfile)

    if checkMemberStatus == -1:
        # No record exist, then create a new subribbit member record

        # If subribbit is private then user status will be pending, otherwise accepted
        memberStatus = SubribbitMemberStatus.get.ACCEPTED.value
        if subribbit.type == SubribbitTypes.get.PRIVATE.value:
            memberStatus = SubribbitMemberStatus.get.PENDING.value
        
        SubribbitMember.objects.create (
            subribbit = subribbit,
            userprofile = userProfile,
            status = memberStatus,
        )

        if subribbit.type != SubribbitTypes.get.PRIVATE.value:
            subribbit.numMembers += 1
            subribbit.save()

        sendNotification(User.objects.get(id=subribbit.ownerId), user, subribbit)
        
        if subribbit.type == SubribbitTypes.get.PRIVATE.value:
            return response('Your request to join this subribbit have been submitted. Please wait for approval from the subribbit creator')
        return response('Subribbit joined')
    
    elif checkMemberStatus == 0:
        return error('You already have a pending request to join this subribbit')
    
    elif checkMemberStatus == 1:
        return error('You are already part of this subribbit')
    
    elif checkMemberStatus == 2:
        return error('Your request to join this subribbit have been denied by the subribbit creator')

    else:
        return error('You have been banned from this subribbit')
