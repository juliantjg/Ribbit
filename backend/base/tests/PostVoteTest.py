from django.test import TestCase
from django.test import Client
from base.models import User, UserProfile, Post, Subribbit, SubribbitMember, PostVote
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import SubribbitMemberStatus, SubribbitTypes
import string, random

class PostVoteTestClass(TestCase):
    newUser = None
    baseUrl = '/api/votePost/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }

    def generateRandomString(self, length):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(10))
    
    def generateRandomEmail(self):
        return self.generateRandomString(10) + '@email.com'
    
    def createNewUser(self):
        user = User.objects.create(
            username = self.newUser['username'],
            email    = self.newUser['email'],
            password = make_password(self.newUser['password'])
        )

        profile = UserProfile.objects.create(
            userId = user.id,
            gravatarURL = '/'
        )

        return user

    def createNewUserObject(self):
        user = User.objects.create(
            username = self.generateRandomString(10),
            email    = self.generateRandomEmail(),
            password = make_password(self.newUser['password'])
        )

        profile = UserProfile.objects.create(
            userId = user.id,
            gravatarURL = '/'
        )

        return user

    def createPostData(self):
        return {
            "title" : self.generateRandomString(5),
            "content" : self.generateRandomString(5),
            "nsfw" : "n",
        }
    
    def createPostObjectWithDependencies(self):
        newUser = self.createNewUserObject()
        subribbit = Subribbit.objects.create(
            name = self.generateRandomString(5),
            description = self.generateRandomString(5),
            ownerId = self.createNewUserObject().id,
            type = SubribbitTypes.get.PUBLIC.value,
        )
        userprofile = UserProfile.objects.get(userId = newUser.id)
        subribbitMember = SubribbitMember.objects.create(
            subribbit = subribbit,
            userprofile = userprofile,
            status = SubribbitMemberStatus.get.ACCEPTED.value
        )
        post = Post.objects.create(
            user = newUser,
            title = self.generateRandomString(5),
            content = self.generateRandomString(5),
            nsfw = "n",
            subRibbit = subribbit.name
        )
        return post
    
    def test_upvote_post_success(self):
        url = self.baseUrl
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "postId": postObjectWithDeps.id,
            "vote": 1
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(PostVote.objects.filter(postId=postObjectWithDeps.id)) > 0)

    def test_remove_vote_from_post_success(self):
        url = self.baseUrl
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        PostVote.objects.create(
            user = user,
            userId = user.id,
            post = postObjectWithDeps,
            postId = postObjectWithDeps.id,
            vote = 1
        )

        data = {
            "postId": postObjectWithDeps.id,
            "vote": 1
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(PostVote.objects.filter(postId=postObjectWithDeps.id)) == 0)

    def test_downvote_post_success(self):
        url = self.baseUrl
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "postId": postObjectWithDeps.id,
            "vote": -1
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(PostVote.objects.filter(postId=postObjectWithDeps.id)) > 0)

    def test_vote_post_id_not_found_fails(self):
        url = self.baseUrl
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "postId": 10^5,
            "vote": 1
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(len(PostVote.objects.filter(postId=postObjectWithDeps.id)) > 0)

    def test_vote_post_invalid_vote_fails(self):
        url = self.baseUrl
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "postId": postObjectWithDeps.id,
            "vote": 5
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(len(PostVote.objects.filter(postId=postObjectWithDeps.id)) > 0)
