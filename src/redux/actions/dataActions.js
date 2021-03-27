import { LOADING_DATA, SET_SCREAMS,  LIKE_SCREAM, UNLIKE_SCREAM} from '../types';
import axios from "axios";

export const getScreams = () => dispatch => {
    //dispatch({ type: LOADING_DATA });
    //console.log("screas are:");
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
    axios
        .get(`/scream/${screamId}/unLike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}