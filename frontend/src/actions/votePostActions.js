import axios from "axios";
import {
    VOTE_POST_REQUEST,
    VOTE_POST_SUCCESS,
    VOTE_POST_FAIL,
} from "../actions/types";
import { backendUrl } from "../securityUtils/vars";

export const votePostAction = (postId, vote) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOTE_POST_REQUEST
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
            backendUrl + 'api/votePost/',
            { 'postId': postId, 'vote': vote },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: VOTE_POST_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: VOTE_POST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}