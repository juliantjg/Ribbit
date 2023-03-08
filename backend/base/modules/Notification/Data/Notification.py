from django.db import models

from django.contrib.auth.models import User

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    text = models.TextField(null=True, blank=True)

    link = models.CharField(max_length=200, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)