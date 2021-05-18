import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_FEATURE,
    FETCH_MISMATCH,
    FETCH_MISSING,
    FETCH_MATCH,
    UPDATE_TARGET_DESC,
    UPDATE_SOURCE_DESC,
    UPLOAD_SOURCE_CSV,
    UPLOAD_TARGET_CSV,
    UPLOAD_SOURCE_JSON,
    UPLOAD_TARGET_JSON,
    FETCH_RECONCILIATION
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
                localStorage.setItem('username', response.data.username);

                // - redirect to the route '/feature'
                History.push('/source');

            }).catch(() => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    };
};

// export const signupUser = ({ email, password }) => {
//     return (dispatch) => {
//         // submit email/password to the server
//         axios.post(`${ROOT_URL}/signup/${localStorage.getItem('username')}`, { email, password })
//             .then(response => {
//                 dispatch({ type: AUTH_USER });
//                 localStorage.setItem('token', response.data.token);
//                 History.push('/source');
//             })
//             .catch(err => {
//                 dispatch(authError(err.response.data.error));
//             });
//     };
// };

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
        axios.get(`${ROOT_URL}/source-desc/${localStorage.getItem('username')}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_FEATURE,
                    payload: response.data
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};

export const fetchReconciliationFeature = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/reconciliation/${localStorage.getItem('username')}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_RECONCILIATION,
                    payload: response.data
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};



export const fetchMismatch = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/mismatch/${localStorage.getItem('username')}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MISMATCH,
                    payload: response.data
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};

export const fetchMatch = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/matching/${localStorage.getItem('username')}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MATCH,
                    payload: response.data
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};

export const fetchMissing = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/missing/${localStorage.getItem('username')}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MISSING,
                    payload: response.data
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};


export const uploadTargetJson = (file) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post(`${ROOT_URL}/json-target/upload/${localStorage.getItem('username')}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_TARGET_JSON
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
    
};

export const uploadSourceJson = (file) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post(`${ROOT_URL}/json-source/upload/${localStorage.getItem('username')}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_SOURCE_JSON
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};

export const uploadTargetCSV = (file) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post(`${ROOT_URL}/csv-target/upload/${localStorage.getItem('username')}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_TARGET_CSV
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};


export const uploadSourceCSV = (file) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post(`${ROOT_URL}/csv-source/upload/${localStorage.getItem('username')}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_SOURCE_CSV
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    dispatch({ type: AUTH_ERROR });
                    History.push('/');
                } 
            });
    };
};



export const updateSourceDescription = (source, selectedType, fileName) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/source/${localStorage.getItem('username')}`,
            {
                sourceName: source,
                fileType: selectedType,
                fileName: fileName
            },
            {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            }).then(response => {
                dispatch({
                    type: UPDATE_SOURCE_DESC
                });
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    History.push('/');
                } 
            });
    };
};

export const updateTargetDescription = (source, selectedType, fileName) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/target/${localStorage.getItem('username')}`,
            {
                sourceName: source,
                fileType: selectedType,
                fileName: fileName
            },
            {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            }).then(response => {
                if(response.status=="200"){
                dispatch({
                    type: UPDATE_TARGET_DESC
                });
            }
            }).catch(({ response }) => { 
                if(response.status=="403"){
                    History.push('/');
                } 
            });
    };
};




