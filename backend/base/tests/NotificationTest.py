from django.test import TestCase
from django.test import Client
from base.models import User, UserProfile, Notification
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import force_authenticate
from base.enums import SubribbitMemberStatus, SubribbitTypes
import string, random

class NotificationTestClass(TestCase):
    newUser = None
    baseUrl = '/api/notification/'

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
    
    def createNewNotificationObject(self, user):
        return Notification.objects.create(
            user = user,
            title = self.generateRandomString(10),
            text = self.generateRandomString(40),
            link = 'www.test.com'
        )
    
    def test_show_all_notifications_success(self):
        notifCount = 5
        url = self.baseUrl + 'all/'

        # Authenticate commenter--------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        for i in range(notifCount):
            self.createNewNotificationObject(user)

        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == notifCount)
