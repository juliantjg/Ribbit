from base.views.baseViews import validationError
from base.models import User
import re

def validate(request):
    data = request.data

    if data.get('username') == None or data['username'] == '' or data['username'] == {} or data.get('email') == None or data['email'] == '' or data.get('email') == None or data['email'] == {} or data.get('password') == None or data['password'] == '' or data.get('password') == None or data['password'] == {} or data.get('c_password') == None or data['c_password'] == '' or data.get('c_password') == {}:
        return validationError('Please fill in the registration fields')

    checkEmailExist = User.objects.filter(email = data['email'])
    checkUsernameExist = User.objects.filter(username = data['username'])

    if not re.match('^[a-zA-Z0-9]+$', data['username']): 
        return validationError('Username cannot contain spaces or special characters')

    if len(data['username']) > 12:
        return validationError('Username cannot be more than 12 characters')

    if data['password'] != data['c_password']:
        return validationError('Confirm password does not match')

    if type(data['password']) != str:
        return validationError('Please fill in the password field')

    if ' ' in data['username']:
        return validationError('Username cannot have spaces')

    if len(checkEmailExist) > 0 or len(checkUsernameExist) > 0:
        return validationError('Email/Username is taken')

    return None