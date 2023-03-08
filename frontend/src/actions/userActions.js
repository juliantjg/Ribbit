import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_RESET,

    SEND_RESET_PASSWORD_EMAIL_REQUEST,
    SEND_RESET_PASSWORD_EMAIL_SUCCESS,
    SEND_RESET_PASSWORD_EMAIL_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

} from '../actions/types';
import axios from 'axios';
import { backendUrl } from "../securityUtils/vars";
;


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/auth/login/',
            { 'username': email, 'password': password },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: USER_LOGIN_SUCCESS,
            // just data, not data.data because the auth provided by python doesn't store the data in data variable (unlike mine)
            payload: data
        })

        // now finally store the userInfo into local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error.response.data.detail)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.detail
                : 'Invalid credentials',
        })
    }
}

export const logout = () => (dispatch) => {
    // first we clear local storage
    localStorage.removeItem('userInfo')

    // we also need to remove the user information from our state
    dispatch({ type: USER_LOGOUT })
}

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            backendUrl + 'api/auth/register/',
            { 'username': username, 'email': email, 'password': password, 'c_password': confirmPassword },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const userDetailsAction = (username) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(backendUrl + `api/user/getProfile/${username}/`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const updateUserProfileAction = (username) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST
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
        const { data } = await axios.put(
            backendUrl + `api/user/updateMe/`,
            { 'username': username },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data.message
        })

        var updatedUserInfo = JSON.parse(localStorage.getItem('userInfo'))
        updatedUserInfo.username = username

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))

    } catch (error) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const sendResetPasswordEmailAction = (email) => async (dispatch) => {
    try {
        dispatch({
            type: SEND_RESET_PASSWORD_EMAIL_REQUEST
        })

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/auth/resetPasswordEmail/',
            { 'email': email },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
            // just data, not data.data because the auth provided by python doesn't store the data in data variable (unlike mine)
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: SEND_RESET_PASSWORD_EMAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const resetPasswordAction = (token, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/auth/resetPassword/',
            { 'token': token, 'password': password, 'c_password': confirmPassword },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            // just data, not data.data because the auth provided by python doesn't store the data in data variable (unlike mine)
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

