import {
    CREATE_SUBRIBBIT_REQUEST,
    CREATE_SUBRIBBIT_SUCCESS,
    CREATE_SUBRIBBIT_FAIL,
    CREATE_SUBRIBBIT_RESET,

    SUBRIBBIT_LIST_REQUEST,
    SUBRIBBIT_LIST_SUCCESS,
    SUBRIBBIT_LIST_FAIL,

    SUBRIBBIT_DETAILS_REQUEST,
    SUBRIBBIT_DETAILS_SUCCESS,
    SUBRIBBIT_DETAILS_FAIL,

    OWNED_AND_JOINED_SUBRIBBIT_LIST_REQUEST,
    OWNED_AND_JOINED_SUBRIBBIT_LIST_SUCCESS,
    OWNED_AND_JOINED_SUBRIBBIT_LIST_FAIL,

    REQUEST_JOIN_SUBRIBBIT_REQUEST,
    REQUEST_JOIN_SUBRIBBIT_FAIL,
    REQUEST_JOIN_SUBRIBBIT_SUCCESS,

    GET_SUBRIBBIT_MEMBERS_REQUEST,
    GET_SUBRIBBIT_MEMBERS_FAIL,
    GET_SUBRIBBIT_MEMBERS_SUCCESS,

    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_REQUEST,
    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_FAIL,
    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_SUCCESS,

    UPDATE_SUBRIBBIT_MEMBER_REQUEST,
    UPDATE_SUBRIBBIT_MEMBER_SUCCESS,
    UPDATE_SUBRIBBIT_MEMBER_FAIL,
    UPDATE_SUBRIBBIT_MEMBER_RESET,

    UPDATE_SUBRIBBIT_REQUEST,
    UPDATE_SUBRIBBIT_SUCCESS,
    UPDATE_SUBRIBBIT_FAIL,
    UPDATE_SUBRIBBIT_RESET,

    GET_TOP_SUBRIBBITS_REQUEST,
    GET_TOP_SUBRIBBITS_SUCCESS,
    GET_TOP_SUBRIBBITS_FAIL,
} from "../actions/types";

export const createSubribbitReducers = (state = {}, action) => {
    switch (action.type) {

        case CREATE_SUBRIBBIT_REQUEST:
            return {
                loading: true
            }

        case CREATE_SUBRIBBIT_SUCCESS:
            return {
                loading: false,
                subribbit: action.payload
            }

        case CREATE_SUBRIBBIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_SUBRIBBIT_RESET:
            return {}

        default:
            return state
    }
}

export const subribbitListReducers = (state = { subribbits: [] }, action) => {
    switch (action.type) {

        case SUBRIBBIT_LIST_REQUEST:
            return {
                loading: true,
                subribbits: []
            }

        case SUBRIBBIT_LIST_SUCCESS:
            return {
                loading: false,
                subribbits: action.payload
            }

        case SUBRIBBIT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const ownedAndJoinedSubribbitListReducers = (state = { ownedAndJoinedSubribbits: [] }, action) => {
    switch (action.type) {

        case OWNED_AND_JOINED_SUBRIBBIT_LIST_REQUEST:
            return {
                loading: true,
                ownedAndJoinedSubribbits: []
            }

        case OWNED_AND_JOINED_SUBRIBBIT_LIST_SUCCESS:
            return {
                loading: false,
                ownedAndJoinedSubribbits: action.payload
            }

        case OWNED_AND_JOINED_SUBRIBBIT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const subribbitDetailsReducers = (state = { subribbit: {} }, action) => {
    switch (action.type) {

        case SUBRIBBIT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case SUBRIBBIT_DETAILS_SUCCESS:
            return {
                loading: false,
                subribbit: action.payload
            }

        case SUBRIBBIT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const requestJoinSubribbitReducers = (state = {}, action) => {
    switch (action.type) {

        case REQUEST_JOIN_SUBRIBBIT_REQUEST:
            return {
                loading: true
            }

        case REQUEST_JOIN_SUBRIBBIT_SUCCESS:
            return {
                loading: false,
                requestJoinSubribbit: action.payload
            }

        case REQUEST_JOIN_SUBRIBBIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const subribbitMembersReducers = (state = { members: [] }, action) => {
    switch (action.type) {

        case GET_SUBRIBBIT_MEMBERS_REQUEST:
            return {
                loading: true,
                members: []
            }

        case GET_SUBRIBBIT_MEMBERS_SUCCESS:
            return {
                loading: false,
                members: action.payload
            }

        case GET_SUBRIBBIT_MEMBERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const subribbitMembersForMembersReducers = (state = { members: [] }, action) => {
    switch (action.type) {

        case GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_REQUEST:
            return {
                loading: true,
                members: []
            }

        case GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_SUCCESS:
            return {
                loading: false,
                members: action.payload
            }

        case GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const updateSubribbitMemberReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_SUBRIBBIT_MEMBER_REQUEST:
            return {
                loading: true,
                member: []
            }

        case UPDATE_SUBRIBBIT_MEMBER_SUCCESS:
            return {
                loading: false,
                member: action.payload
            }

        case UPDATE_SUBRIBBIT_MEMBER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_SUBRIBBIT_MEMBER_RESET:
            return {}

        default:
            return state
    }
}

export const updateSubribbitReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_SUBRIBBIT_REQUEST:
            return {
                loading: true,
                subribbit: {}
            }

        case UPDATE_SUBRIBBIT_SUCCESS:
            return {
                loading: false,
                subribbit: action.payload
            }

        case UPDATE_SUBRIBBIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_SUBRIBBIT_RESET:
            return {}

        default:
            return state
    }
}

export const topSubribbitListReducers = (state = { topSubribbits: [] }, action) => {
    switch (action.type) {

        case GET_TOP_SUBRIBBITS_REQUEST:
            return {
                loading: true,
                topSubribbits: []
            }

        case GET_TOP_SUBRIBBITS_SUCCESS:
            return {
                loading: false,
                topSubribbits: action.payload
            }

        case GET_TOP_SUBRIBBITS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}