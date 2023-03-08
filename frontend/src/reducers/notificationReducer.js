import {
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,
} from "../actions/types";

export const getAllNotificationsReducers = (state = { notifications: [] }, action) => {
    switch (action.type) {

        case GET_NOTIFICATIONS_REQUEST:
            return {
                loading: true,
                notifications: []
            }

        case GET_NOTIFICATIONS_SUCCESS:
            return {
                loading: false,
                notifications: action.payload
            }

        case GET_NOTIFICATIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}