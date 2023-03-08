from base.views.baseViews import validationError
from base.enums import SubribbitTypes
import re

def validate(request):
    data = request.data

    if data.get('name') == None:
        return validationError('Please provide a subribbit name')

    if not re.match('^[a-zA-Z0-9]+$', data['name']): 
        return validationError('Subribbit name cannot contain spaces or special characters')
    
    if len(data['name']) > 15:
        return validationError('Subribbit name cannot be more than 15 characters')
    
    if data.get('description') == None:
        return validationError('Please provide a description')
    
    if data.get('type') == None:
        return validationError('Please provide a type')

    if data['type'] not in [e.value for e in SubribbitTypes.get]:
        return validationError('Invalid subribbit type')

    return None