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

class SubribbitTestClass(TestCase):
    newUser = None
    baseUrl = '/api/subribbit/'

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
        return self.generateRandomString(20) + '@email.com'
    
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
            username = self.generateRandomString(20),
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
    
    def createSubribbitData(self):
        return {
            "name": self.generateRandomString(40),
            "description": self.generateRandomString(10),
            "type": SubribbitTypes.get.PUBLIC.value
        }
    
    def createSubribbitObject(self):
        randomData = self.createSubribbitData()
        randomUser = self.createNewUserObject()
        return Subribbit.objects.create(
            name = randomData['name'],
            description = randomData['description'],
            type = randomData['type'],
            ownerId = randomUser.id
        )
    
    def createSubribbitMemberObject(self, subribbit, status, user=None):
        if user == None:
            user = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId = user.id)
        SubribbitMember.objects.create(
                userprofile = userprofile,
                subribbit = subribbit,
                status = status,
            )
    
    def test_create_subribbit_success(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = self.createSubribbitData()
        data['ownerId'] = user.id
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(Subribbit.objects.filter(ownerId=user.id, name=data['name'])) > 0)

    def test_create_subribbit_name_taken_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        definedName = 'takenNameTest'
        Subribbit.objects.create(
            name=definedName
        )

        data = self.createSubribbitData()
        data['ownerId'] = user.id
        data['name'] = definedName
        response = c.post(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(len(Subribbit.objects.filter(ownerId=user.id, name=data['name'])) > 0)

    def test_create_subribbit_empty_data_fails(self):
        url = self.baseUrl + 'create/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        data = {}
        response = c.post(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_show_all_subribbits_success(self):
        count = 2
        url = self.baseUrl + 'all/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        for i in range(count):
            self.createSubribbitObject()
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == count)

    def test_show_top_subribbits_success(self):
        count = 4
        url = self.baseUrl + 'topSubribbits/' + str(count) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        # To test if it's only fetching the given number of count instead of all
        for i in range(count+1):
            self.createSubribbitObject()
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == count)

    def test_show_joined_and_owned_subribbits_success(self):
        count = 4
        url = self.baseUrl + 'joinedAndOwned/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)
        # To test if it's only fetching the given number of count instead of all
        for i in range(count):
            sub = self.createSubribbitObject()
            SubribbitMember.objects.create(
                userprofile = userprofile,
                subribbit = sub,
                status = SubribbitMemberStatus.get.ACCEPTED.value,
            )
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == count)

    def test_show_one_subribbit_success(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'one/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(response.json()['data']['name'] == sub.name)

    def test_show_one_subribbit_id_not_found_fails(self):
        url = self.baseUrl + 'one/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_show_one_subribbit_with_name_success(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'getOneWithName/' + str(sub.name) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(response.json()['data']['name'] == sub.name)

    def test_show_one_subribbit_with_name_not_found_fails(self):
        url = self.baseUrl + 'getOneWithName/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_update_subribbit_success(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'update/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newType = SubribbitTypes.get.PRIVATE.value
        newDesc = self.generateRandomString(10)
        data = {
            "description": newDesc,
            "type": newType,
        }
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(Subribbit.objects.get(id=sub.id).type == newType)
        self.assertTrue(Subribbit.objects.get(id=sub.id).description == newDesc)

    def test_update_subribbit_empty_data_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'update/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newType = SubribbitTypes.get.PRIVATE.value
        newDesc = self.generateRandomString(10)
        data = {}
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertFalse(Subribbit.objects.get(id=sub.id).type == newType)
        self.assertFalse(Subribbit.objects.get(id=sub.id).description == newDesc)

    def test_update_subribbit_invalid_sub_type_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'update/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newType = 8
        data = {}
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertFalse(Subribbit.objects.get(id=sub.id).type == newType)

    def test_update_subribbit_id_not_found_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'update/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newType = SubribbitTypes.get.PRIVATE.value
        newDesc = self.generateRandomString(10)
        data = {
            "description": newDesc,
            "type": newType,
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_public_subribbit_success(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)
        
        response = c.post(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(SubribbitMember.objects.filter(userprofile=userprofile, subribbit=sub, status=SubribbitMemberStatus.get.ACCEPTED.value)) > 0)

    def test_request_join_private_subribbit_success(self):
        sub = self.createSubribbitObject()
        sub.type = SubribbitTypes.get.PRIVATE.value
        sub.save()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)
        
        response = c.post(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(SubribbitMember.objects.filter(userprofile=userprofile, subribbit=sub, status=SubribbitMemberStatus.get.PENDING.value)) > 0)

    def test_request_join_subribbit_id_not_found_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'requestJoin/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)
        
        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_private_subribbit_pending_request_fails(self):
        sub = self.createSubribbitObject()
        sub.type = SubribbitTypes.get.PRIVATE.value
        sub.save()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)

        SubribbitMember.objects.create(
            userprofile = userprofile,
            subribbit = sub,
            status=SubribbitMemberStatus.get.PENDING.value,
        )
        
        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_private_subribbit_already_a_member_fails(self):
        sub = self.createSubribbitObject()
        sub.type = SubribbitTypes.get.PRIVATE.value
        sub.save()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)

        SubribbitMember.objects.create(
            userprofile = userprofile,
            subribbit = sub,
            status=SubribbitMemberStatus.get.ACCEPTED.value,
        )
        
        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_private_subribbit_request_already_denied_fails(self):
        sub = self.createSubribbitObject()
        sub.type = SubribbitTypes.get.PRIVATE.value
        sub.save()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)

        SubribbitMember.objects.create(
            userprofile = userprofile,
            subribbit = sub,
            status=SubribbitMemberStatus.get.REJECTED.value,
        )
        
        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_request_join_private_subribbit_banned_from_sub_fails(self):
        sub = self.createSubribbitObject()
        sub.type = SubribbitTypes.get.PRIVATE.value
        sub.save()
        url = self.baseUrl + 'requestJoin/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        userprofile = UserProfile.objects.get(userId=user.id)

        SubribbitMember.objects.create(
            userprofile = userprofile,
            subribbit = sub,
            status=SubribbitMemberStatus.get.BANNED.value,
        )
        
        response = c.post(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_show_subribbit_members_success(self):
        membersCount = 5
        pendingCount = 2
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'showMembers/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        # Add ACCEPTED members
        for i in range(membersCount):
            self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.ACCEPTED.value)
        
        # Add additional PENDING users (this shouldn't count as members)
        for i in range(pendingCount):
            self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.PENDING.value)
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == membersCount)

    def test_show_subribbit_members_id_not_found_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'showMembers/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_show_subribbit_members_for_sub_owner_success(self):
        membersCount = 5
        pendingCount = 2
        rejectedCount = 1
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'showMembersForMod/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        # Add ACCEPTED members
        for i in range(membersCount):
            self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.ACCEPTED.value)
        
        # Add additional PENDING users 
        for i in range(pendingCount):
            self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.PENDING.value)

        # Add additional REJECTED users 
        for i in range(rejectedCount):
            self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.REJECTED.value)
        
        response = c.get(url, {}, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(len(response.json()['data']) == (membersCount+pendingCount+rejectedCount))

    def test_show_subribbit_members_for_sub_owner_id_not_found_fails(self):
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'showMembersForMod/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------

        response = c.get(url, {}, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_change_subribbit_member_status_success(self):
        newStatus = SubribbitMemberStatus.get.ACCEPTED.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)
        self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.PENDING.value, newMember)

        data = {
            "status": newStatus,
            "userId": newMember.id
        }
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_200_OK)
        self.assertTrue(SubribbitMember.objects.get(userprofile = userprofile, subribbit = sub).status == newStatus)

    def test_change_subribbit_member_status_to_pending_fails(self):
        newStatus = SubribbitMemberStatus.get.PENDING.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)
        self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.ACCEPTED.value, newMember)

        data = {
            "status": newStatus,
            "userId": newMember.id
        }
        response = c.put(url, data, format='json')
        self.assertTrue(response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.assertFalse(SubribbitMember.objects.get(userprofile = userprofile, subribbit = sub).status == newStatus)

    def test_change_subribbit_member_status_not_owner_fails(self):
        newStatus = SubribbitMemberStatus.get.PENDING.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        self.createNewUser()
        user = User.objects.get(username=self.newUser['username'])
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)
        self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.ACCEPTED.value, newMember)

        data = {
            "status": newStatus,
            "userId": newMember.id
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(SubribbitMember.objects.get(userprofile = userprofile, subribbit = sub).status == newStatus)

    def test_change_subribbit_member_status_member_not_found_fails(self):
        newStatus = SubribbitMemberStatus.get.ACCEPTED.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)

        data = {
            "status": newStatus,
            "userId": newMember.id
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)

    def test_change_subribbit_member_status_subribbit_id_not_found_fails(self):
        newStatus = SubribbitMemberStatus.get.ACCEPTED.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(10^5) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)
        self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.PENDING.value, newMember)

        data = {
            "status": newStatus,
            "userId": newMember.id
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(SubribbitMember.objects.get(userprofile = userprofile, subribbit = sub).status == newStatus)

    def test_change_subribbit_member_status_user_id_not_found_fails(self):
        newStatus = SubribbitMemberStatus.get.ACCEPTED.value
        sub = self.createSubribbitObject()
        url = self.baseUrl + 'changeMemberStatus/' + str(sub.id) + '/'

        # Authenticate user-------------------------------------------
        user = User.objects.get(id=sub.ownerId)
        c = APIClient()
        c.force_authenticate(user=user)
        # ------------------------------------------------------------
        
        newMember = self.createNewUserObject()
        userprofile = UserProfile.objects.get(userId=newMember.id)
        self.createSubribbitMemberObject(sub, SubribbitMemberStatus.get.PENDING.value, newMember)

        data = {
            "status": newStatus,
            "userId": 10^5
        }
        response = c.put(url, data, format='json')
        self.assertFalse(response.status_code == status.HTTP_200_OK)
        self.assertFalse(SubribbitMember.objects.get(userprofile = userprofile, subribbit = sub).status == newStatus)
