from rest_framework.response import Response
from rest_framework import status
from base.models import *
from django.contrib.auth.models import User
import datetime
from django.utils.timezone import utc
import hashlib
from base.serializers import *

def response(message, data=None):
    retVal = {'success' : 'true', 'message': message, 'data' : data}
    return Response(retVal)

def error(message):
    retVal = {'success' : 'false', 'message' : message}
    return Response(retVal, status = status.HTTP_400_BAD_REQUEST)

def validationError(message='Required fields not met'):
    retVal = {'success' : 'false', 'message' : message}
    return Response(retVal, status = status.HTTP_422_UNPROCESSABLE_ENTITY)
    