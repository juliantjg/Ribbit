import {
    VOTE_POST_REQUEST,
    VOTE_POST_SUCCESS,
    VOTE_POST_FAIL,
} from "../actions/types";



export const votePostReducers = (state = {}, action) => {
    switch (action.type) {

        case VOTE_POST_REQUEST:
            return {
                loading: true
            }

        case VOTE_POST_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case VOTE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}