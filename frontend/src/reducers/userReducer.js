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

export const userLoginReducers = (state = {}, action) => {
    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false, message: action.payload
            }

        case USER_REGISTER_FAIL:
            return {
                loading: false, error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducers = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const updateUserProfileReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_USER_PROFILE_REQUEST:
            return {
                loading: true
            }

        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case UPDATE_USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_USER_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const sendResetPasswordEmailReducers = (state = {}, action) => {
    switch (action.type) {

        case SEND_RESET_PASSWORD_EMAIL_REQUEST:
            return {
                loading: true,
            }

        case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case SEND_RESET_PASSWORD_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const resetPasswordReducers = (state = {}, action) => {
    switch (action.type) {

        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            }

        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

