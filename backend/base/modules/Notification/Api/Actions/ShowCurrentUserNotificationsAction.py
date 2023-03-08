from base.views.baseViews import response, error
from base.models import User, Notification
from base.serializers import NotificationSerializer

def get(request):
    user = request.user

    notifications = Notification.objects.filter(user = user)

    reversed = notifications[::-1]
    serializedNotifications = NotificationSerializer(reversed, many=True).data

    return response('All comments retrieved', serializedNotifications)