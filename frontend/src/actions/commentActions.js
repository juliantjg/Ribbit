import axios from "axios";
import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,

    GET_ALL_COMMENT_REQUEST,
    GET_ALL_COMMENT_SUCCESS,
    GET_ALL_COMMENT_FAIL,

    LIKE_UNLIKE_REQUEST,
    LIKE_UNLIKE_SUCCESS,
    LIKE_UNLIKE_FAIL,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
} from "../actions/types";
import { backendUrl } from "../securityUtils/vars";

export const createCommentAction = (text, postId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_COMMENT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/comment/create/',
            { 'text': text, 'postId': postId },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getAllCommentAction = (postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_COMMENT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if userInfo equals null, meaning user is not logged in, we don't wanna pass in config. But if they are logged in we need to pass
        // the user into the backend to check whether or not they've liked a comment
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our post request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(
            backendUrl + `api/comment/all/${postId}/`,
            config
        )

        dispatch({
            type: GET_ALL_COMMENT_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const likeUnlikeAction = (commentId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIKE_UNLIKE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/comment/likeUnlike/',
            { 'commentId': commentId },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: LIKE_UNLIKE_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: LIKE_UNLIKE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteCommentAction = (commentId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_COMMENT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.delete(
            backendUrl + `api/comment/delete/${commentId}/`,
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}