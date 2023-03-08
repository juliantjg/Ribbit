from base.models import Post, PostVote, Subribbit
from base.serializers import PostSerializer
from base.views.baseViews import error, response
from base.traits import GetPostsWithUserVoteStatus

def checkHaveVoted(userId, postId):
    checkPostVoteExist = PostVote.objects.filter(userId = userId, postId = postId)

    if len(checkPostVoteExist) > 0:
        return True
    else:
        return False

def checkSubExist(subName):
    checkSubribbitExist = Subribbit.objects.filter(name=subName)
    
    if len(checkSubribbitExist) > 0:
        return True
    else:
        return False

def validateSort(sortField):
    allowedSorts = ['rating', 'numComments']
    if sortField not in allowedSorts:
        return False
    return True

def sortAndSearch(request, sub):
    # How to sort: ?sort=rating
    # How to search (post title): ?search=some title

    sortField = ''
    if request.GET.get('sort') != None:
        sortField = request.GET.get('sort', '')

        if not validateSort(sortField):
            return 'Targeted sort field not found'

    searchValue = ''
    if request.GET.get('search') != None:
        searchValue = request.GET.get('search', '')

    # Sub options other than the subribbit name: 
    # home, which is the sub name but is the default sub
    # -, which means we're not passing any sub (for explore page)
    if sub != '-':
        if searchValue != '' and sortField != '':
            return Post.objects.filter(subRibbit = sub, title__icontains = searchValue).order_by('-' + sortField, '-createdAt')
        elif searchValue != '':
            return Post.objects.filter(subRibbit = sub, title__icontains = searchValue).order_by('-createdAt')
        elif sortField != '':
            return Post.objects.filter(subRibbit = sub).order_by('-' + sortField, '-createdAt')
        else:
            return Post.objects.filter(subRibbit = sub).order_by('-createdAt')
    else:
        if searchValue != '' and sortField != '':
            return Post.objects.filter(title__icontains = searchValue).order_by('-' + sortField, '-createdAt')
        elif searchValue != '':
            return Post.objects.filter(title__icontains = searchValue).order_by('-createdAt')
        elif sortField != '':
            return Post.objects.all().order_by('-' + sortField, '-createdAt')
        else:
            return Post.objects.all().order_by('-createdAt')

def show(request, sub):
    if sub != '-' and sub != 'home' and not checkSubExist(sub):
        return error('Sub Ribbit not found')
    else:
        posts = sortAndSearch(request, sub)
        if type(posts) == str:
            return error(posts)

        serializedPosts = PostSerializer(posts, many=True).data
        copySerializedPosts = list(serializedPosts)

        returnPosts = GetPostsWithUserVoteStatus.get(copySerializedPosts, request.user)

        return response('All posts retrieved', returnPosts)