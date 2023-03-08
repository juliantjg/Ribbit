from base.models import Post
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from better_profanity import profanity

def checkPostId(id):
    checkPostExist = Post.objects.filter(id = id)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def update(request, pk):
    data = request.data

    data['title'] = profanity.censor(data['title'])
    data['content'] = profanity.censor(data['content'])

    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)

    post.title = data['title']
    post.content = data['content']
    post.nsfw = data['nsfw']

    post.save()

    return response('Post updated')