from rest_framework import serializers
from base.models import Notification
from base.traits import GetHumanTimeDifferenceToNow

class NotificationSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)