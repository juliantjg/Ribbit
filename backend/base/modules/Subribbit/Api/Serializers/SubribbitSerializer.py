from rest_framework import serializers
from base.models import Subribbit, UserProfile, User, SubribbitMember, Post
from base.enums import SubribbitTypes, SubribbitMemberStatus

class SubribbitSerializer(serializers.ModelSerializer):
    typeName = serializers.SerializerMethodField(read_only=True)
    numPosts = serializers.SerializerMethodField(read_only=True)
    ownerUsername = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Subribbit
        fields = ['id', 'name', 'ownerId', 'description', 'typeName', 'type', 'numMembers', 'numPosts', 'createdAt', 'ownerUsername']

    def get_typeName(self, obj):
        return SubribbitTypes.get(obj.type).name

    def get_numPosts(self, obj):
        return len(Post.objects.filter(subRibbit = obj.name))

    def get_ownerUsername(self, obj):
        return User.objects.get(id=obj.ownerId).username

class GetAllSubribbitSerializer(serializers.ModelSerializer):
    typeName = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Subribbit
        fields = ['id', 'name', 'ownerId', 'description', 'numMembers', 'typeName']
    
    def get_typeName(self, obj):
        return SubribbitTypes.get(obj.type).name

class SubribbitAcceptedMemberSerializer(serializers.ModelSerializer):
    gravatarURL = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SubribbitMember
        fields = ['id', 'username', 'gravatarURL']

    def get_gravatarURL(self, obj):
        findUser = UserProfile.objects.filter(id = obj.userprofile.id)
        return findUser[0].gravatarURL

    def get_username(self, obj):
        userId = UserProfile.objects.get(id = obj.userprofile.id).userId
        user = User.objects.get(id=userId)
        return user.username

class SubribbitMemberForModSerializer(serializers.ModelSerializer):
    gravatarURL = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    statusName = serializers.SerializerMethodField(read_only=True)
    userId = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SubribbitMember
        fields = ['id', 'username', 'gravatarURL', 'status', 'statusName', 'userId']

    def get_gravatarURL(self, obj):
        findUser = UserProfile.objects.filter(id = obj.userprofile.id)
        return findUser[0].gravatarURL

    def get_username(self, obj):
        userId = UserProfile.objects.get(id = obj.userprofile.id).userId
        user = User.objects.get(id=userId)
        return user.username
    
    def get_statusName(self, obj):
        return SubribbitMemberStatus.get(obj.status).name

    def get_userId(self, obj):
        userId = UserProfile.objects.get(id = obj.userprofile.id).userId
        user = User.objects.get(id=userId)
        return user.id
