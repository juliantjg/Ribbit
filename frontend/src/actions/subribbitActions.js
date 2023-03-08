import axios from "axios";
import {
    CREATE_SUBRIBBIT_REQUEST,
    CREATE_SUBRIBBIT_SUCCESS,
    CREATE_SUBRIBBIT_FAIL,

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
    REQUEST_JOIN_SUBRIBBIT_SUCCESS,
    REQUEST_JOIN_SUBRIBBIT_FAIL,

    GET_SUBRIBBIT_MEMBERS_REQUEST,
    GET_SUBRIBBIT_MEMBERS_SUCCESS,
    GET_SUBRIBBIT_MEMBERS_FAIL,

    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_REQUEST,
    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_SUCCESS,
    GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_FAIL,

    UPDATE_SUBRIBBIT_MEMBER_REQUEST,
    UPDATE_SUBRIBBIT_MEMBER_SUCCESS,
    UPDATE_SUBRIBBIT_MEMBER_FAIL,

    UPDATE_SUBRIBBIT_REQUEST,
    UPDATE_SUBRIBBIT_SUCCESS,
    UPDATE_SUBRIBBIT_FAIL,

    GET_TOP_SUBRIBBITS_REQUEST,
    GET_TOP_SUBRIBBITS_SUCCESS,
    GET_TOP_SUBRIBBITS_FAIL,
} from "../actions/types";
import { backendUrl } from "../securityUtils/vars";

export const createSubribbitAction = (name, description, type) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_SUBRIBBIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            backendUrl + 'api/subribbit/create/',
            { 'name': name, 'description': description, 'type': type },
            config
        )

        dispatch({
            type: CREATE_SUBRIBBIT_SUCCESS,
            payload: data.message
        })

        window.location.href = 'community/' + name

    } catch (error) {
        dispatch({
            type: CREATE_SUBRIBBIT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listSubribbits = (search) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBRIBBIT_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        var url = "http://localhost:8000/api/subribbit/all/";
        if (search != "" && search != null) {
            url = backendUrl + `api/subribbit/all/?search=${search}`;
        }

        const { data } = await axios.get(
            url,
            config
        )

        dispatch({
            type: SUBRIBBIT_LIST_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: SUBRIBBIT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const listOwnedAndJoinedSubribbits = () => async (dispatch, getState) => {
    try {
        dispatch({ type: OWNED_AND_JOINED_SUBRIBBIT_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        const { data } = await axios.get(
            backendUrl + 'api/subribbit/joinedAndOwned/',
            config
        )

        dispatch({
            type: OWNED_AND_JOINED_SUBRIBBIT_LIST_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: OWNED_AND_JOINED_SUBRIBBIT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const subribbitDetailAction = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBRIBBIT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(backendUrl + `api/subribbit/getOneWithName/${name}/`, config)

        dispatch({
            type: SUBRIBBIT_DETAILS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: SUBRIBBIT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const requestJoinSubribbitAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_JOIN_SUBRIBBIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(backendUrl + `api/subribbit/requestJoin/${id}/`, {}, config)

        // window.location.href = 'post/' + data.data.id

        alert(data.message)

        dispatch({
            type: REQUEST_JOIN_SUBRIBBIT_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: REQUEST_JOIN_SUBRIBBIT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        alert(error.response.data.message)
    }
}

export const subribbitMembersAction = (subribbitId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_SUBRIBBIT_MEMBERS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(backendUrl + `api/subribbit/showMembersForMod/${subribbitId}/`, config)

        dispatch({
            type: GET_SUBRIBBIT_MEMBERS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_SUBRIBBIT_MEMBERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const subribbitMembersForMembersAction = (subribbitId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(backendUrl + `api/subribbit/showMembers/${subribbitId}/`, config)

        dispatch({
            type: GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_SUBRIBBIT_MEMBERS_FOR_MEMBERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const updateSubribbitMemberAction = (userId, status, subribbitId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_SUBRIBBIT_MEMBER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            backendUrl + `api/subribbit/changeMemberStatus/${subribbitId}/`,
            { 'userId': userId, 'status': status },
            config
        )

        dispatch({
            type: UPDATE_SUBRIBBIT_MEMBER_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: UPDATE_SUBRIBBIT_MEMBER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const updateSubribbitAction = (subribbitId, description, type) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_SUBRIBBIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            backendUrl + `api/subribbit/update/${subribbitId}/`,
            { 'description': description, 'type': type },
            config
        )


        dispatch({
            type: UPDATE_SUBRIBBIT_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: UPDATE_SUBRIBBIT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listTopSubribbits = (limit) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_TOP_SUBRIBBITS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null

        // if there is an authenticated user then pass it in header to check whether or not user's joined the sub
        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our get request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        }

        const { data } = await axios.get(
            backendUrl + `api/subribbit/topSubribbits/${limit}/`,
            config
        )

        dispatch({
            type: GET_TOP_SUBRIBBITS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_TOP_SUBRIBBITS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};
