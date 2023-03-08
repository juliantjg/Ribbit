from django.test import TestCase
from django.test import Client
from base.models import User, UserProfile
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate

class UserTestClass(TestCase):
    newUser = None
    baseUrl = '/api/user/'

    def setUp(self):
        self.newUser = {
            "name": "test user",
            "username": "test",
            "email": "test@email.com",
            "password": "password"
        }
    
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

    def getUserTotalVotes(self, userId):
        findUserVotes = UserProfile.objects.filter(votedUserId = userId)
        totalVotes = 0
        for i in findUserVotes:
            totalVotes += i.status
        return totalVotes

    def test_get_user_profile_success(self):
        url = self.baseUrl + 'getProfile/' + self.newUser['username'] + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.newUser['username'], response.json()['data']['username'])

    def test_get_user_profile_username_not_found_fails(self):
        url = self.baseUrl + 'getProfile/' + ('a'*20) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_my_profile_success(self):
        url = self.baseUrl + 'updateMe/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newUsername = user.username + 'Updated'
        data = {
            'username' : newUsername
        }
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertEqual(User.objects.get(id=user.id).username, newUsername)

    def test_update_my_profile_invalid_username_fails(self):
        url = self.baseUrl + 'updateMe/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newUsername = '****'
        data = {
            'username' : newUsername
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(User.objects.get(id=user.id).username == newUsername)
