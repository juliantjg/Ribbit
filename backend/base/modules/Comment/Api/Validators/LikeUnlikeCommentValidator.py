from base.views.baseViews import validationError
from base.models import Comment

def checkCommentId(commentId):
    checkCommentExist = Comment.objects.filter(id = commentId)

    if len(checkCommentExist) > 0:
        return True
    else:
        return False

def validate(request):
    data = request.data

    if data.get('commentId') == None:
        return validationError('Please provide a comment ID')
    
    if not checkCommentId(data['commentId']):
        return validationError('Comment ID not found')
    
    return None