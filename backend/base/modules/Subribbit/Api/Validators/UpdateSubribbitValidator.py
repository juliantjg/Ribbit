from base.views.baseViews import validationError
from base.enums import SubribbitTypes

def validate(request):
    data = request.data

    if data.get('description') == None:
        return validationError('Please provide a description')

    if data.get('type') == None:
        return validationError('Please provide a type')

    if data['type'] not in [e.value for e in SubribbitTypes.get]:
        return validationError('Invalid subribbit type')

    return None