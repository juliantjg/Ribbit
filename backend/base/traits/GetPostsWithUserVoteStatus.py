from base.models import PostVote

def checkHaveVoted(userId, postId):
    checkPostVoteExist = PostVote.objects.filter(userId = userId, postId = postId)

    if len(checkPostVoteExist) > 0:
        return True
    else:
        return False

def get(posts, user=None):

    returnList = []

    for postIteration in posts:
        if user != None:
            # If there is an authenticated user then show whether or not user has upvoted/downvoted
            user = user
            postCopy = dict(postIteration)
            if checkHaveVoted(user.id, postCopy['id']):
                findCheckVote = PostVote.objects.filter(postId = postCopy['id'], userId = user.id)
                foundCheckVote = PostVote.objects.get(id = findCheckVote[0].id)

                if foundCheckVote.vote == 1:
                    postCopy = dict(postIteration)
                    postCopy['upvote'] = True
                    postCopy['downvote'] = False
                else:
                    postCopy = dict(postIteration)
                    postCopy['upvote'] = False
                    postCopy['downvote'] = True
                
            else:
                # if user haven't voted yet then both upVote and downVote is false:
                postCopy = dict(postIteration)
                postCopy['upvote'] = False
                postCopy['downvote'] = False


        else:
            postCopy = dict(postIteration)
            postCopy['upvote'] = False
            postCopy['downvote'] = False
            
        returnList.append(postCopy)
    
    return returnList