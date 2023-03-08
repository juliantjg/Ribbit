from base.views.baseViews import validationError

def validate(request):
    data = request.data
    if data.get('postId') == None or data.get('text') == None:
        return validationError('Required fields not met')

    if str(data['text']) == '' or str(data['text']).isspace() == True:
        return validationError('Cannot post an empty comment')

    return None