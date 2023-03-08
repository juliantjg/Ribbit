from base.models import Post, UserProfile
from base.serializers import PostSerializer
from base.views.baseViews import error, response

def checkPostId(id):
    checkPostExist = Post.objects.filter(id = id)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def delete(request, pk):
    data = request.data
    user = request.user

    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)

    if user.id != post.user.id:
        return error('Can only delete your own posts')

    userProfile = UserProfile.objects.get(userId = user.id)
    userProfile.numPosts -= 1
    userProfile.save()

    post.delete()

    return response('Post deleted.')