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
        axios.post(`${ROOT_URL}/authenticate`, { username, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('username', response.data.username);
                History.push('/source');
            }).catch(() => {
                dispatch(authError('Bad Login Info'));
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



export const fetchReconciliationFeature = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/reconciliations`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_RECONCILIATION,
                    payload: response.data
                });
            }).catch(({ response }) => {
                if (response.status == "403") {
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                }
            });
    };
};



export const fetchResult = (id) => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/result/${id}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_RESULT,
                    payload: response.data
                });
            }).catch(({ response }) => {
                if (response.status == "403") {
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                }
            });
    };
};

export const resetFileDescriptions = () => {
    return (dispatch) => {
        dispatch({ type: RESET_FILE_DESC });
    };
}

export const resetSourceDescriptions = () => {
    return (dispatch) => {
        dispatch({ type: RESET_SOURCE_DESC });
    };
}

export const resetTargetDescriptions = () => {
    return (dispatch) => {
        dispatch({ type: RESET_TARGET_DESC });
    };
}


export const uploadFiles = (sourceDescription, targetDescription) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('source-file', sourceDescription.sourceFile)
        formData.append('target-file', targetDescription.targetFile)
        var sourceDesc = {
            sourceName: sourceDescription.source,
            fileType: sourceDescription.sourceSelectedType,
            fileName: sourceDescription.sourceFileName
        }
        formData.append('sourceDescription', JSON.stringify(sourceDesc))
        var targetDesc = {
            sourceName: targetDescription.target,
            fileType: targetDescription.targetSelectedType,
            fileName: targetDescription.targetFileName
        }
        formData.append('targetDescription', JSON.stringify(targetDesc))
        dispatch({
            type: UPLOADING_FILES
        });
        axios.post(`${ROOT_URL}/upload`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_FILES,
                    payload: response.data
                });
            }).catch(({ response }) => {
                if (response && response.status == "417") {
                    dispatch({ type: FILE_UPLOAD_ERROR });
                }
                if (response && response.status == "403") {
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                }
            });
    };
};



export const updateSourceDescription = (payload) => {
    return { type: UPDATE_SOURCE_DESC, payload: payload }
};

export const updateFileId = (id) => {
    return {
        type: SET_FILE_ID, payload: { 'id': id }
    };
}

export const updateTargetDescription = (targetObject) => {
    return { type: UPDATE_TARGET_DESC, payload: targetObject }
};




