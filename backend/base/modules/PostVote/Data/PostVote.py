from django.db import models
from django.contrib.auth.models import User
from base.models import Post

class PostVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    userId = models.IntegerField(null=True, blank=True, default=0)
    postId = models.IntegerField(null=True, blank=True, default=0)
    vote = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.id)