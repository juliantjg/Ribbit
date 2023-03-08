from base.models import PostVote

def checkHaveVoted(userId, postId):
    checkPostVoteExist = PostVote.objects.filter(userId = userId, postId = postId)

    if len(checkPostVoteExist) > 0:
        return True
    else:
        return False

def get(post, user=None):
    postCopy = {}

    if user != None:
        # If there is an authenticated user then show whether or not user has upvoted/downvoted
        user = user
        postCopy = dict(post)
        if checkHaveVoted(user.id, postCopy['id']):
            findCheckVote = PostVote.objects.filter(postId = postCopy['id'], userId = user.id)
            foundCheckVote = PostVote.objects.get(id = findCheckVote[0].id)

            if foundCheckVote.vote == 1:
                postCopy = dict(post)
                postCopy['upvote'] = True
                postCopy['downvote'] = False
            else:
                postCopy = dict(post)
                postCopy['upvote'] = False
                postCopy['downvote'] = True
            
        else:
            # if user haven't voted yet then both upVote and downVote is false:
            postCopy = dict(post)
            postCopy['upvote'] = False
            postCopy['downvote'] = False

    else:
        postCopy = dict(post)
        postCopy['upvote'] = False
        postCopy['downvote'] = False

    return postCopy