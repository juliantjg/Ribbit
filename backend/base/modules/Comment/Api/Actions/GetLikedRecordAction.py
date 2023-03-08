from base.views.baseViews import response, error
from base.models import CommentLike
from base.serializers import CommentLikeSerializer

def get(request):
    commentLike = CommentLike.objects.all()
    serializer = CommentLikeSerializer(commentLike, many=True)

    return response('Comment Like records retireved', serializer.data)