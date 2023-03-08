import axios from "axios";
import {
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,
} from "../actions/types";
import { backendUrl } from "../securityUtils/vars";

export const listNotificationsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_NOTIFICATIONS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null
        // we're passing header into our post request

        if (userInfo == null) {
            config = null
        } else {
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        const { data } = await axios.get(
            backendUrl + `api/notification/all/`,
            config
        )

        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};