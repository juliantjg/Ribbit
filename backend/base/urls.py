from django.urls import path
from base.modules.Auth.Api import AuthViews
from base.modules.Comment.Api import CommentViews
from base.modules.Post.Api import PostViews
from base.modules.PostVote.Api import PostVoteViews
from base.modules.User.Api import UserViews
from base.modules.Subribbit.Api import SubribbitViews
from base.modules.Notification.Api import NotificationViews

urlpatterns = [
    path('auth/login/', AuthViews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/register/', AuthViews.registerUser, name="register_user"),
    path('auth/resetPasswordEmail/', AuthViews.resetPasswordEmail, name='reset_password_email'),
    path('auth/resetPassword/', AuthViews.resetPassword, name='reset_password'),

    path('user/allUser/', UserViews.getUsers, name="get_all_users"),
    path('user/getProfile/<str:username>/', UserViews.getProfile, name="get_profile"),
    path('user/updateMe/', UserViews.updateMyProfile, name="update_my_profile"),

    path('post/user/<str:username>/', PostViews.getUserPost, name="get_user_post"),
    path('post/create/', PostViews.createPost, name="create_post"),
    path('post/update/<str:pk>/', PostViews.updatePost, name='update_post'),
    path('post/read/<str:pk>/', PostViews.readPost, name="read_post"),
    path('post/all/<str:sub>/', PostViews.showAllPost, name="all_post"),
    path('post/delete/<str:pk>/', PostViews.deletePost, name="delete_post"),

    path('votePost/', PostVoteViews.votePost, name="vote_post"),

    path('comment/create/', CommentViews.createComment, name="create_comment"),
    path('comment/all/<str:postId>/', CommentViews.allCommentFromPost, name="all_comment_from_post"),
    path('comment/delete/<str:commentId>/', CommentViews.deleteComment, name="delete_comment"),
    path('comment/likeUnlike/', CommentViews.likeUnlike, name="like_unlike"),
    path('comment/likeUnlike/all/', CommentViews.getLikeRecord, name="comment_like_record"),

    path('subribbit/create/', SubribbitViews.create, name="create_subribbit"),
    path('subribbit/all/', SubribbitViews.all, name="get_all_subribbit"),
    path('subribbit/topSubribbits/<str:limit>/', SubribbitViews.getTopSubribbits, name="get_top_subribbits"),
    path('subribbit/joinedAndOwned/', SubribbitViews.getJoinedAndOwned, name="get_joined_and_owned_subribbits"),
    path('subribbit/one/<str:pk>/', SubribbitViews.one, name="get_one_subribbit"),
    path('subribbit/getOneWithName/<str:name>/', SubribbitViews.getSubribbitWithName, name="get_one_subribbit_with_name"),
    path('subribbit/update/<str:pk>/', SubribbitViews.update, name="update_subribbit"),
    path('subribbit/requestJoin/<str:pk>/', SubribbitViews.requestJoin, name="request_join_subribbit"),
    path('subribbit/showMembers/<str:pk>/', SubribbitViews.showMembers, name="get_subribbit_members"),
    path('subribbit/showMembersForMod/<str:pk>/', SubribbitViews.showMembersForMod, name="get_subribbit_members_for_mod"),
    path('subribbit/changeMemberStatus/<str:pk>/', SubribbitViews.changeMemberStatus, name="change_subribbit_member_status"),

    path('notification/all/', NotificationViews.currentUserNotifications, name="get_current_user_notifications"),
]