from django.db import models
from base.models import UserProfile
from base.enums import SubribbitMemberStatus, SubribbitTypes

class Subribbit(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True, unique=True)
    ownerId = models.IntegerField(null=True, blank=True)
    numMembers = models.IntegerField(null=True, blank=True, default=0)
    description = models.CharField(max_length=1000, null=True, blank=True)
    members = models.ManyToManyField(UserProfile, through='SubribbitMember')
    type = models.IntegerField(null=True, blank=True, default=SubribbitTypes.get.PUBLIC.value)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

class SubribbitMember(models.Model):
    subribbit = models.ForeignKey(Subribbit, on_delete=models.CASCADE)
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    status = models.IntegerField(null=True, blank=True, default=SubribbitMemberStatus.get.PENDING.value)

    def __str__(self):
        return str(self.id)