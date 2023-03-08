import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { postListReducers, postDetailsReducers, createPostReducers, userPostListReducers, deletePostReducers, updatePostReducers } from './reducers/postReducer'
import { userLoginReducers, userRegisterReducer, userDetailsReducers, updateUserProfileReducers, sendResetPasswordEmailReducers, resetPasswordReducers } from './reducers/userReducer';
import { createCommentReducers, getAllCommentReducers, likeUnlikeReducers, deleteCommentReducers } from "./reducers/commentReducer";
import { votePostReducers } from "./reducers/votePostReducers"
import { createSubribbitReducers, subribbitListReducers, ownedAndJoinedSubribbitListReducers, subribbitDetailsReducers, requestJoinSubribbitReducers, subribbitMembersReducers, subribbitMembersForMembersReducers, updateSubribbitMemberReducers, updateSubribbitReducers, topSubribbitListReducers } from "./reducers/subribbitReducer";
import { getAllNotificationsReducers } from "./reducers/notificationReducer";


const reducer = combineReducers({
    postList: postListReducers,
    postDetails: postDetailsReducers,
    createPost: createPostReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducer,
    createComment: createCommentReducers,
    allComments: getAllCommentReducers,
    userDetails: userDetailsReducers,
    userPosts: userPostListReducers,
    likeUnlike: likeUnlikeReducers,
    deleteComment: deleteCommentReducers,
    deletePost: deletePostReducers,
    updatePost: updatePostReducers,
    votePost: votePostReducers,
    createSubribbit: createSubribbitReducers,
    subribbitList: subribbitListReducers,
    ownedAndJoinedSubribbitList: ownedAndJoinedSubribbitListReducers,
    subribbitDetails: subribbitDetailsReducers,
    requestJoinSubribbit: requestJoinSubribbitReducers,
    subribbitMembers: subribbitMembersReducers,
    subribbitMembersForMembers: subribbitMembersForMembersReducers,
    updateSubribbitMember: updateSubribbitMemberReducers,
    updateSubribbit: updateSubribbitReducers,
    allNotifications: getAllNotificationsReducers,
    topSubribbitList: topSubribbitListReducers,
    updateUserProfile: updateUserProfileReducers,
    sendResetPasswordEmail: sendResetPasswordEmailReducers,
    resetPassword: resetPasswordReducers,
})



// we grab the user info from local Storage, if no info then set it to null
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

// now we set the user info into initialState, thus we can access this from every component
const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;
