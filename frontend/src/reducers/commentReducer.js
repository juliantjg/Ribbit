import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    CREATE_COMMENT_RESET,

    GET_ALL_COMMENT_REQUEST,
    GET_ALL_COMMENT_SUCCESS,
    GET_ALL_COMMENT_FAIL,

    LIKE_UNLIKE_REQUEST,
    LIKE_UNLIKE_SUCCESS,
    LIKE_UNLIKE_FAIL,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,
} from "../actions/types";

export const createCommentReducers = (state = {}, action) => {
    switch (action.type) {

        case CREATE_COMMENT_REQUEST:
            return {
                loadingCreateComment: true,
            }

        case CREATE_COMMENT_SUCCESS:
            return {
                loading: false,
                messageCreateComment: action.payload
            }

        case CREATE_COMMENT_FAIL:
            return {
                loading: false,
                errorCreateComment: action.payload
            }

        case CREATE_COMMENT_RESET:
            return {}

        default:
            return state
    }
}

export const getAllCommentReducers = (state = { comments: [] }, action) => {
    switch (action.type) {

        case GET_ALL_COMMENT_REQUEST:
            return {
                loadingAllComments: true,
                comments: []
            }

        case GET_ALL_COMMENT_SUCCESS:
            return {
                loadingAllComments: false,
                comments: action.payload
            }

        case GET_ALL_COMMENT_FAIL:
            return {
                loadingAllComments: false,
                errorAllComments: action.payload
            }

        default:
            return state
    }
}

export const likeUnlikeReducers = (state = {}, action) => {
    switch (action.type) {

        case LIKE_UNLIKE_REQUEST:
            return {
                loading: true,
            }

        case LIKE_UNLIKE_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case LIKE_UNLIKE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const deleteCommentReducers = (state = {}, action) => {
    switch (action.type) {

        case DELETE_COMMENT_REQUEST:
            return {
                loading: true,
            }

        case DELETE_COMMENT_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case DELETE_COMMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case DELETE_COMMENT_RESET:
            return {}

        default:
            return state
    }
}