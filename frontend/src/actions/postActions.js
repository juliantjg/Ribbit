import axios from "axios";
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

  USER_POST_LIST_REQUEST,
  USER_POST_LIST_SUCCESS,
  USER_POST_LIST_FAIL,

  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_POST_FAIL,

  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
} from "../actions/types";
import { useNavigate, withRouter } from "react-router-dom";
import { backendUrl } from "../securityUtils/vars";

export const listPosts = (sub, sort, search) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

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

    var url = backendUrl + `api/post/all/${sub}/`;
    if (sort != null && sort != 'latest') {
      url = backendUrl + `api/post/all/${sub}/?sort=${sort}`;
    }

    if (search != "" && search != null) {
      url = backendUrl + `api/post/all/${sub}/?search=${search}`;
    }

    const { data } = await axios.get(
      url,
      config
    )

    dispatch({
      type: POST_LIST_SUCCESS,
      // data.data because that is how i made it in the backend, the array of data is inside the data variable
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
};

export const listPostDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST })

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
      backendUrl + `api/post/read/${id}/`,
      config
    )

    dispatch({
      type: POST_DETAILS_SUCCESS,
      // data.data because that is how i made it in the backend, the array of data is inside the data variable
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
};

export const listUserPostsAction = (username, sort) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_POST_LIST_REQUEST })

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

    var url = backendUrl + `api/post/user/${username}/`;
    if (sort != null && sort != 'latest') {
      url = backendUrl + `api/post/user/${username}/?sort=${sort}`;
    }

    const { data } = await axios.get(
      url,
      config
    )

    dispatch({
      type: USER_POST_LIST_SUCCESS,
      // data.data because that is how i made it in the backend, the array of data is inside the data variable
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: USER_POST_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
};

export const createPostAction = (title, content, nsfw, subribbitName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST
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
    // console.log(subribbit)
    // this is the regular axios call, but we're now passing in username, password and the config above
    const { data } = await axios.post(
      backendUrl + 'api/post/create/',
      { 'title': title, 'content': content, 'nsfw': nsfw, 'subribbit': subribbitName },
      config
    )

    window.location.href = 'post/' + data.data.id


    // the regular success dispatch, with payload data from the axios call above
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data.message
    })


  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const deletePostAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST
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
      backendUrl + `api/post/delete/${postId}/`,
      config
    )

    // the regular success dispatch, with payload data from the axios call above
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data.message
    })


  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}


export const updatePostAction = (postId, title, content, nsfw) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST
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
      backendUrl + `api/post/update/${postId}/`,
      { 'title': title, 'content': content, 'nsfw': nsfw },
      config
    )

    // the regular success dispatch, with payload data from the axios call above
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data.message
    })


  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}