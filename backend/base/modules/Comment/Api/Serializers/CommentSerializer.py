from rest_framework import serializers
from base.models import Comment, CommentLike, UserProfile
from base.traits import GetHumanTimeDifferenceToNow

def getNumOfLikes(commentId):
    return len(CommentLike.objects.filter(commentId = commentId))

class CommentSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    numLikes = serializers.SerializerMethodField(read_only=True)
    userImage = serializers.SerializerMethodField(read_only=True)
    userName = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_numLikes(self, obj):
        return getNumOfLikes(obj.id)

    def get_userImage(self, obj):
        userId = obj.user.id
        userProfile = UserProfile.objects.filter(userId = userId)
        return userProfile[0].gravatarURL

    def get_userName(self, obj):
        return obj.user.username