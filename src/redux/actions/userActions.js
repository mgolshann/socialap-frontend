import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    console.log("loginUser ====> ");
    //dispatch({ type: LOADING_UI });

    axios.post('/login', userData)
        .then(res => {
            console.log("login result =====> ", res.data);

            setAuthorizationHeader(res.headers['x-auth-token']);
            dispatch(getUserData());
            // dispatch({ type: CLEAR_ERRORS });

            history.push('/');
        })
        .catch(err => {
            console.log(">>>>>>", err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}

export const signupUser = (newUserData, history) => (dispatch) => {
    console.log("loginUser ====> ");
    //dispatch({ type: LOADING_UI });

    axios.post('/signup', newUserData)
        .then(res => {
            console.log("signup result =====> ", res.data);

            setAuthorizationHeader(res.headers['x-auth-token']);
            dispatch(getUserData());
            // dispatch({ type: CLEAR_ERRORS });

            history.push('/');
        })
        .catch(err => {
            console.log(">>>>>>", err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}

export const getUserData = () => (dispatch) => {
    const token = localStorage.getItem("x-auth-token");
    axios.get('/getUserData', {
        headers: {
            'x-auth-token': `${token}`
        }
    })
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("x-auth-token");
    delete axios.defaults.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}

const setAuthorizationHeader = (token) => {
    localStorage.setItem("x-auth-token", token);
    axios.defaults.headers.common['Authorization'] = token;
}