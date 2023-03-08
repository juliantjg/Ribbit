from base.models import Notification

def send(user, title, text, link=None):
    Notification.objects.create(
        user = user,
        title = title,
        text = text,
        link = link,
    )