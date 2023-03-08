from rest_framework import serializers
from base.models import CommentLike

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = '__all__'