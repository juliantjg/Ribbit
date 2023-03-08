from base.views.baseViews import validationError

def validate(request):
    data = request.data

    if data.get('postId') == None:
        return validationError('Please provide a post ID')
    
    if data.get('vote') == None:
        return validationError('Please provide a vote')

    if data['vote'] != 1 and data['vote'] != -1:
        return validationError('Invalid vote type (enter either 1 or -1)')

    return None