import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    console.log("loginUser ====> ");
    //dispatch({ type: LOADING_UI });

    axios.post('/login', userData)
        .then(res => {
            console.log("res.data =====> ", res.data);
            const token = res.headers['x-auth-token'];
            localStorage.setItem("x-auth-token", token);
            axios.defaults.headers.common['Authorization'] = token;

            // dispatch(getUserData());
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
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}