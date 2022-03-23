import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_RESULT,
    RESET_FILE_DESC,
    UPDATE_TARGET_DESC,
    UPDATE_SOURCE_DESC,
    UPLOAD_FILES,
    UPLOADING_FILES,
    SET_FILE_ID,
    FETCH_RECONCILIATION,
    RESET_TARGET_DESC,
    RESET_SOURCE_DESC,
    FILE_UPLOAD_ERROR
} from './types';

const ROOT_URL = 'http://localhost:8080';

export const signinUser = ({ username, password }) => {
    return (dispatch) => {
        if(username=='sushrutghimire1'){
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', 'r123123123ljdnfiashfaljskdna');
                localStorage.setItem('username', 'sushrutghimire1');
                History.push('/source');
        }else{
                dispatch(authError('Bad Login Info'));
        }
            
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




