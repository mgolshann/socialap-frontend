import {
    LOADING_DATA,
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    POST_SCREAM,
    CLEAR_ERRORS, SET_SCREAM, STOP_LOADING_UI
} from '../types';

import axios from "axios";

export const getScreams = () => dispatch => {
    //dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const likeScream = screamId => dispatch => {
    const token = localStorage.getItem("x-auth-token");
    axios
        .get(`/scream/${screamId}/like`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const unLikeScream = (screamId) => dispatch => {
    const token = localStorage.getItem("x-auth-token");
    axios
        .get(`/scream/${screamId}/unLike`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const deleteScream = screamId => dispatch => {
    const token = localStorage.getItem("x-auth-token");
    axios
        .delete(`/scream/${screamId}/deleteScream`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then(res => {
            dispatch({ type: DELETE_SCREAM, payload: res.data })
        })
        .catch(err => console.log(err))
}

export const postScream = newScream => dispatch => {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('x-auth-token');
    axios
        .post('/scream', newScream, { headers: { 'x-auth-token': `${token}` } })
        .then(res => {
            dispatch({ type: POST_SCREAM, payload: res.data })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('x-auth-token');
    axios
        .get(`/scream/${screamId}`, { headers: { 'x-auth-token': token } })
        .then(res => {
            dispatch({ type: SET_SCREAM, payload: res.data });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
}