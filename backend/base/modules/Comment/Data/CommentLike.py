from django.db import models

class CommentLike(models.Model):
    userId = models.IntegerField(null=True, blank=True, default=0)
    commentId = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.id)