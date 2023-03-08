from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import UserProfile

class RegisterUserSerializer(serializers.ModelSerializer):
    gravatarURL = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'gravatarURL']

    def get_gravatarURL(self, obj):
        findUser = UserProfile.objects.filter(userId = obj.id)
        return findUser[0].gravatarURL