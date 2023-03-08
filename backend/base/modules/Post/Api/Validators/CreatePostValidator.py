from base.views.baseViews import validationError

def validate(request):
    data = request.data

    if data.get('title') == None or str(data['title']).isspace() == True or str(data['title']) == "" or data.get('content') == None or data.get('nsfw') == None or data.get('subribbit') == None:
        return validationError('Please fill in required fields')

    if data.get('nsfw') != 'y' and data.get('nsfw') != 'n':
        return validationError('Please enter y/n for nsfw')

    return None