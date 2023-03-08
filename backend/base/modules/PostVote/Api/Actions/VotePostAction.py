from base.views.baseViews import error, response
from base.models import PostVote, Post
from base.traits import NotifyUser

def sendNotification(voteCreator, postOwner, post):
    if voteCreator.id != postOwner.id:
        title = 'New vote on post'
        text = 'u/' + voteCreator.username + ' has just upvoted on one of your posts'
        link = '/post/' + str(post.id)
        NotifyUser.send(postOwner, title, text, link)

def checkPostId(id):
    checkPostExist = Post.objects.filter(id = id)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

def checkHaveVoted(userId, postId):
    checkPostVoteExist = PostVote.objects.filter(userId = userId, postId = postId)

    if len(checkPostVoteExist) > 0:
        return True
    else:
        return False

def vote(request):
    user = request.user
    data = request.data

    if not checkPostId(data['postId']):
        return error('Post ID not found')

    post = Post.objects.get(id = data['postId'])

    if checkHaveVoted(user.id, post.id):
        # the user has voted, now check if it is matches the given vote (upvote/downvote)
        findVote = PostVote.objects.filter(userId = user.id, postId = post.id)
        foundVote = PostVote.objects.get(id = findVote[0].id)

        if data['vote'] == foundVote.vote:
            # if user selected the same vote, then delete the record (upvoting twice equals to not voting at all)
            foundVote.delete()

            if data['vote'] == 1:
                post.rating = post.rating - 1
                post.save()
            else:
                post.rating = post.rating + 1
                post.save()

            return response('Vote removed')
        else:
            # if the vote is different, update the vote (e.g. if user has already upvoted before and now they downvote, the vote will be downvote)
            foundVote.vote = data['vote']
            foundVote.save()

            if data['vote'] == 1:
                sendNotification(user, post.user, post)
                post.rating = post.rating + 2
                post.save()
            else:
                post.rating = post.rating - 2
                post.save()

            return response('Vote updated')

    else:
        # the user has not voted (record deleted/doesn't exist), then create a record for the vote
        vote = PostVote.objects.create(
            user = user,
            post = post,
            userId = user.id,
            postId = post.id,
            vote = data['vote']
        )

        if data['vote'] == 1:
            sendNotification(user, post.user, post)
            post.rating = post.rating + 1
            post.save()
        else:
            post.rating = post.rating - 1
            post.save()

        return response('Vote created')