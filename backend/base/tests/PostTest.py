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

class PostTestClass(TestCase):
    newUser = None
    baseUrl = '/api/post/'

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
    
    def test_get_user_posts_success(self):
        postObject = self.createPostObjectWithDependencies()
        user = postObject.user
        subribbitName = postObject.subRibbit

        url = self.baseUrl + 'user/' + user.username + '/'

        Post.objects.create(
            user = user,
            subRibbit = subribbitName
        )
        Post.objects.create(
            user = user,
            subRibbit = subribbitName
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

    def test_get_user_posts_username_not_found_fails(self):
        url = self.baseUrl + 'user/' + ('a'*20) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_create_post_on_home_success(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        data['subribbit'] = 'home'
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Post.objects.filter(title=data['title'])) > 0)

    def test_create_post_on_home_invalid_data_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        data['subribbit'] = 'home'
        data['nsfw'] = 'o'
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_create_post_on_subribbit_success(self):
        url = self.baseUrl + 'create/'
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        data['subribbit'] = postObjectWithDeps.subRibbit
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Post.objects.filter(title=data['title'])) > 0)

    def test_create_post_on_subribbit_as_non_member_fails(self):
        url = self.baseUrl + 'create/'
        postObjectWithDeps = self.createPostObjectWithDependencies()

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        data['subribbit'] = postObjectWithDeps.subRibbit
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_create_post_on_subribbit_not_found_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        data['subribbit'] = ('a'*20)
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_post_success(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'update/' + str(postObjectWithDeps.id) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(Post.objects.get(id=postObjectWithDeps.id).title == data['title'])

    def test_update_post_id_not_found_fails(self):
        url = self.baseUrl + 'update/' + str(10^5) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createPostData()
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_read_post_success(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'read/' + str(postObjectWithDeps.id) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(postObjectWithDeps.title == response.json()['data']['title'])

    def test_read_post_id_not_found_fails(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'read/' + str(10^5) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_get_all_posts_on_home_success(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()
        Post.objects.create(
            user = postObjectWithDeps.user,
            subRibbit = 'home',
        )

        url = self.baseUrl + 'all/' + 'home' + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) > 0)

    def test_get_all_posts_on_subribbit_success(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'all/' + postObjectWithDeps.subRibbit + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) > 0)

    def test_get_all_posts_on_subribbit_sub_not_found_fails(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'all/' + ('a'*50) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_delete_post_success(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'delete/' + str(postObjectWithDeps.id) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Post.objects.filter(id=postObjectWithDeps.id)) < 1)

    def test_delete_post_id_not_found_fails(self):
        postObjectWithDeps = self.createPostObjectWithDependencies()

        url = self.baseUrl + 'delete/' + str(10^5) + "/"

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=postObjectWithDeps.user.username)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.delete(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Post.objects.filter(id=postObjectWithDeps.id)) > 0)
