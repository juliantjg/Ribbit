from rest_framework import serializers
from base.models import Post, PostVote
from base.traits import GetHumanTimeDifferenceToNow

def getPostTotalVotes(postId):
    findPost = Post.objects.get(id = postId)
    findPostVotes = PostVote.objects.filter(postId = findPost.id)

    totalVotes = 0

    for i in findPostVotes:
        totalVotes += i.vote
    
    return totalVotes

def getPostNumberOfVoters(postId):
    findPostVotes = PostVote.objects.filter(postId = postId)

    return len(findPostVotes)

class PostSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    numOfComments = serializers.SerializerMethodField(read_only=True)
    # totalVotes refers to upvotes - downvotes value
    totalVotes = serializers.SerializerMethodField(read_only=True)
    # votesReceived refers to number of people voted on this post
    votesReceived = serializers.SerializerMethodField(read_only=True)
    userName = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_numOfComments(self, obj):
        return len(obj.comment_set.all())

    def get_totalVotes(self, obj):
        return getPostTotalVotes(obj.id)

    def get_votesReceived(self, obj):
        return getPostNumberOfVoters(obj.id)
    
    def get_userName(self, obj):
        return obj.user.username