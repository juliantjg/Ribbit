from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from base.modules.Notification.Api.Actions import (
    ShowCurrentUserNotificationsAction,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUserNotifications(request):
    return ShowCurrentUserNotificationsAction.get(request)
