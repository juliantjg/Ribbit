import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    CREATE_POST_RESET,

    USER_POST_LIST_REQUEST,
    USER_POST_LIST_SUCCESS,
    USER_POST_LIST_FAIL,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_RESET,
    DELETE_POST_FAIL,
    DELETE_POST_DONE,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_RESET,
} from "../actions/types";


export const postListReducers = (state = { posts: [] }, action) => {
    switch (action.type) {

        case POST_LIST_REQUEST:
            return {
                loading: true,
                posts: []
            }

        case POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload
            }

        case POST_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const userPostListReducers = (state = { posts: [] }, action) => {
    switch (action.type) {

        case USER_POST_LIST_REQUEST:
            return {
                loading: true,
                posts: []
            }

        case USER_POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload
            }

        case USER_POST_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

// curly brackets cause post is an Object, unlike posts which is an array
export const postDetailsReducers = (state = { post: {} }, action) => {
    switch (action.type) {

        case POST_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case POST_DETAILS_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }

        case POST_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const createPostReducers = (state = {}, action) => {
    switch (action.type) {

        case CREATE_POST_REQUEST:
            return {
                loading: true
            }

        case CREATE_POST_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }

        case CREATE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_POST_RESET:
            return {}

        default:
            return state
    }
}

export const deletePostReducers = (state = {}, action) => {
    switch (action.type) {

        case DELETE_POST_REQUEST:
            return {
                loading: true,
            }

        case DELETE_POST_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case DELETE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_POST_DONE:
            return {
                done: "done"
            }

        case DELETE_POST_RESET:
            return {}


        default:
            return state
    }
}

export const updatePostReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_POST_REQUEST:
            return {
                loading: true
            }

        case UPDATE_POST_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case UPDATE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_POST_RESET:
            return {}

        default:
            return state
    }
}