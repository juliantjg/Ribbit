from django.db import models

from django.contrib.auth.models import User
from base.models import Post

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    text = models.TextField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)