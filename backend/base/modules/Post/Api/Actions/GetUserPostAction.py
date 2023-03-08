from base.models import Post, User
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetPostsWithUserVoteStatus

def validateSort(sortField):
    allowedSorts = ['rating', 'numComments']
    if sortField not in allowedSorts:
        return False
    return True

def sort(request, user):
    # How to sort: ?sort=rating

    sortField = ''
    if request.GET.get('sort') != None:
        sortField = request.GET.get('sort', '')

        if not validateSort(sortField):
            return 'Targeted sort field not found'

    if sortField != '':
        return Post.objects.filter(user = user).order_by('-' + sortField, '-createdAt')
    else:
        return Post.objects.filter(user = user).order_by('-createdAt')

def checkUsername(username):
    checkUserExist = User.objects.filter(username = username)

    if len(checkUserExist) > 0:
        return True
    else:
        return False

def get(request, username):
    if not checkUsername(username):
        return error('Username not found')

    findUser = User.objects.filter(username=username)
    user = User.objects.get(id = findUser[0].id)

    posts = sort(request, user)
    if type(posts) == str:
        return error(posts)

    serialized = PostSerializer(posts, many=True).data
    copySerializedPosts = list(serialized)

    returnPosts = GetPostsWithUserVoteStatus.get(copySerializedPosts, request.user)

    return response('User posts retrieved', returnPosts)