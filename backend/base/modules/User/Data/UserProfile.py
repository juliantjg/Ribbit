from django.db import models

class UserProfile(models.Model):
    userId = models.IntegerField(null=True, blank=True, unique=True)
    gravatarURL = models.CharField(max_length=200, null=True, blank=True)
    numPosts = models.IntegerField(null=True, blank=True, default=0)

    resetToken = models.CharField(max_length=200, null=True, blank=True)
    resetTokenTime = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.id)
