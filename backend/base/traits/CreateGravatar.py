import hashlib

def create(email):
    lowerCaseEmail = email.lower()
    emailHash = hashlib.md5(lowerCaseEmail.encode())
    hashResult = emailHash.hexdigest()
    gravatarURL = 'https://www.gravatar.com/avatar/' + str(hashResult) + '?d=robohash'
    return gravatarURL