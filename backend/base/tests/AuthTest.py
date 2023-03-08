from django.test import TestCase
from django.test import Client
from base.models import User, UserProfile
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.test import APIRequestFactory


class AuthTestClass(TestCase):
    newUser = None
    baseUrl = '/api/auth/'

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

        UserProfile.objects.create(
            userId = user.id,
            gravatarURL = '/'
        )

    def test_login_success(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'],
            'password': self.newUser['password']
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_empty_fields_fails(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {}
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_login_invalid_credentials_fails(self):
        c = Client()
        url = self.baseUrl + 'login/'

        self.createNewUser()
        data = {
            'username': self.newUser['username'] + 'zzz',
            'password': self.newUser['password'] + 'zzz'
        }
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_success(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = self.newUser
        data['c_password'] = data['password']
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(User.objects.get(username=self.newUser['username']).username == self.newUser['username'])

    def test_register_empty_fields_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = {}
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_register_user_confirm_password_not_match_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        data = self.newUser
        data['c_password'] = data['password'] + 'zzz'
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_username_and_email_taken_fails(self):
        c = Client()
        url = self.baseUrl + 'register/'

        self.createNewUser()
        data = self.newUser
        data['c_password'] = data['password']
        response = c.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_reset_forgotten_password_functionality_success(self):
        c = Client()
        sendResetPassUrl = self.baseUrl + 'resetPasswordEmail/'
        resetPassUrl = self.baseUrl + 'resetPassword/'
        registerUrl = self.baseUrl + 'register/'

        newPassword = self.newUser['password'] + 'zzz'

        data = self.newUser
        data['c_password'] = data['password']
        responseRegister = c.post(registerUrl, data, format='json')

        user = User.objects.get(username=data['username'])

        # Test the send reset password email api
        sendResetPassData = {
            'email': user.email
        }
        responseSendResetPassEmail = c.post(sendResetPassUrl, sendResetPassData, format='json')
        self.assertEqual(responseSendResetPassEmail.status_code, status.HTTP_200_OK)

        # Get the token from user extend model (same token as the one in email)
        userProfile = UserProfile.objects.get(userId=user.id)
        resetPassToken = userProfile.resetToken

        # Test the reset password api
        resetPassData = {
            "token": resetPassToken,
            "password": newPassword,
            "c_password": newPassword
        }
        responseResetPass = c.post(resetPassUrl, resetPassData, format='json')
        self.assertEqual(responseResetPass.status_code, status.HTTP_200_OK)

    def test_reset_forgotten_password_functionality_invalid_token_fails(self):
        c = Client()
        resetPassUrl = self.baseUrl + 'resetPassword/'
        newPassword = self.newUser['password'] + 'zzz'

        # Test the reset password api
        resetPassData = {
            "token": 'dummyToken',
            "password": newPassword,
            "c_password": newPassword
        }
        responseResetPass = c.post(resetPassUrl, resetPassData, format='json')
        self.assertEqual(responseResetPass.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_forgot_password_email_empty_fields_fails(self):
        c = Client()
        sendResetPassUrl = self.baseUrl + 'sendResetPasswordEmail/'
        registerUrl = self.baseUrl + 'register/'

        # Test the send reset password email api
        sendResetPassData = {}
        responseSendResetPassEmail = c.post(sendResetPassUrl, sendResetPassData, format='json')
        self.assertEqual(responseSendResetPassEmail.status_code, status.HTTP_404_NOT_FOUND)