from django.test import TestCase
from django.test import Client
from base.models import User, UserProfile, Post, Subribbit, SubribbitMember, PostVote, Comment, CommentLike
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import SubribbitMemberStatus, SubribbitTypes
import string, random

class CommentTestClass(TestCase):
    newUser = None
    baseUrl = '/api/comment/'

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

    def createCommentData(self):
        return {
            "text": self.generateRandomString(10)
        }
    
    def createCommentObject(self):
        post = self.createPostObjectWithDependencies()
        user = self.createNewUserObject()
        return Comment.objects.create(
            user = user,
            post = post,
            text = self.generateRandomString(10)
        )
    
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
    
    def test_create_comment_success(self):
        url = self.baseUrl + 'create/'

        postObject = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createCommentData()
        data['postId'] = postObject.id
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Comment.objects.filter(text=data['text'])) > 0)

    def test_create_comment_notifies_post_creator_success(self):
        url = self.baseUrl + 'create/'

        postObject = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createCommentData()
        data['postId'] = postObject.id
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)

        # Authenticate post owner-------------------------------------
        user = User.objects.get(username=postObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get('/api/notification/all/', {}, format='json')
        self.assertTrue(len(response.json()['data']) > 0)

    def test_create_comment_invalid_text_fails(self):
        url = self.baseUrl + 'create/'

        postObject = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createCommentData()
        data['postId'] = postObject.id
        data['text'] = ""
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_create_comment_post_id_not_found_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createCommentData()
        data['postId'] = 10^5
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_get_all_comment_from_post_success(self):
        commentObject = self.createCommentObject()
        postObject = commentObject.post

        url = self.baseUrl + 'all/' + str(postObject.id) + '/'

        Comment.objects.create(
            post = postObject,
            user = commentObject.user
        )
        Comment.objects.create(
            post = postObject,
            user = commentObject.user
        )
        
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == 3)

    def test_get_all_comment_from_post_id_not_found_fails(self):
        url = self.baseUrl + 'all/' + str(10^5) + '/'
        
        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_delete_comment_success(self):
        commentObject = self.createCommentObject()
        url = self.baseUrl + 'delete/' + str(commentObject.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=commentObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertFalse(len(Comment.objects.filter(id=commentObject.id)) > 0)

    def test_delete_comment_id_not_found_fails(self):
        commentObject = self.createCommentObject()
        url = self.baseUrl + 'delete/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=commentObject.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Comment.objects.filter(id=commentObject.id)) > 0)

    def test_delete_comment_not_creator_fails(self):
        commentObject = self.createCommentObject()
        url = self.baseUrl + 'delete/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Comment.objects.filter(id=commentObject.id)) > 0)

    def test_like_comment_success(self):
        commentObject = self.createCommentObject()
        url = self.baseUrl + 'likeUnlike/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "commentId": commentObject.id,
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(CommentLike.objects.filter(userId=user.id, commentId=commentObject.id)) > 0)

    def test_unlike_comment_success(self):
        commentObject = self.createCommentObject()
        url = self.baseUrl + 'likeUnlike/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        CommentLike.objects.create(
            commentId = commentObject.id,
            userId = user.id,
        )

        data = {
            "commentId": commentObject.id,
        }
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(CommentLike.objects.filter(userId=user.id, commentId=commentObject.id)) == 0)

    def test_like_comment_id_not_found_fails(self):
        url = self.baseUrl + 'likeUnlike/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {
            "commentId": 10^5,
        }
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
