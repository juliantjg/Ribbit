from base.views.baseViews import validationError
import re

def validate(request):
    data = request.data

    if data.get('username') == None or str(data['username']).isspace() == True or str(data['username']) == "":
        return validationError('Please fill in required fields')

    if not re.match('^[a-zA-Z0-9]+$', data['username']): 
        return validationError('Username cannot contain spaces or special characters')

    if len(data['username']) > 12:
        return validationError('Username cannot be more than 12 characters')

    return None