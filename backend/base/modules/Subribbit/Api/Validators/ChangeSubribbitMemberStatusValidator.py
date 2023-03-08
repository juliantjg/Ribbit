from base.views.baseViews import validationError
from base.enums import SubribbitMemberStatus

def validate(request):
    data = request.data

    if data.get('userId') == None:
        return validationError('Please provide a user ID')

    if data.get('status') == None:
        return validationError('Please provide a status')

    if not isinstance(data['userId'], int) or not isinstance(data['status'], int):
        return validationError('User ID and status must be int')

    if data['status'] not in [e.value for e in SubribbitMemberStatus.get]:
        return validationError('Invalid member status')

    if data['status'] == SubribbitMemberStatus.get.PENDING.value:
        return validationError('Cannot set status back to pending')

    return None