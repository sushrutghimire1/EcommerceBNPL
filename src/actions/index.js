import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_FEATURE,
    FETCH_MISMATCH,
    FETCH_MISSING,
    FETCH_MATCH
} from './types';

const ROOT_URL = 'http://localhost:8080';

export const signinUser = ({ username, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/authenticate`, { username, password })
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', response.data.jwt);

                // - redirect to the route '/feature'
                History.push('/feature');

            }).catch(() => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    };
};

export const signupUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                History.push('/feature');
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};

export const fetchDescriptionFeature = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/source-desc`, {
            headers: { Authorization: 'Bearer '+localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_FEATURE,
                payload: response.data
             });
        });
    };
};

export const fetchMismatch = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/mismatch`, {
            headers: { Authorization: 'Bearer '+localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_MISMATCH,
                payload: response.data
             });
        });
    };
};

export const fetchMatch = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/matching`, {
            headers: { Authorization: 'Bearer '+localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_MATCH,
                payload: response.data
             });
        });
    };
};

export const fetchMissing = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/missing`, {
            headers: { Authorization: 'Bearer '+localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_MISSING,
                payload: response.data
             });
        });
    };
};


