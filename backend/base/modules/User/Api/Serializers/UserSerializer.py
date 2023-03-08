from rest_framework import serializers
from base.models import User, UserProfile, Comment

class UserSerializer(serializers.ModelSerializer):
    gravatarURL = serializers.SerializerMethodField(read_only=True)
    numPosts = serializers.SerializerMethodField(read_only=True)
    numComments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'gravatarURL', 'numPosts', 'numComments']

    def get_gravatarURL(self, obj):
        findUser = UserProfile.objects.filter(userId = obj.id)
        return findUser[0].gravatarURL

    def get_numPosts(self, obj):
        return UserProfile.objects.get(userId = obj.id).numPosts

    def get_numComments(self, obj):
        return len(Comment.objects.filter(user = obj))
