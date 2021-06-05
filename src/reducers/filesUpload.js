import {
    UPLOAD_FILES,
    UPLOADING_FILES,
    RESET_FILE_DESC,
    SET_FILE_ID,
    FILE_UPLOAD_ERROR
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPLOAD_FILES:
            return {
                ...state,
                filesUpdated: true,
                message: action.payload.message,
                id: action.payload.id
            }
        case UPLOADING_FILES:
            return { ...state, filesUpdated: false, fileError: false }
        case RESET_FILE_DESC:
            return {...state, filesUpdated: undefined, id: undefined, fileError: false};
        case SET_FILE_ID:
            return {...state, filesUpdated: undefined, id: action.payload.id, fileError: false};
        case FILE_UPLOAD_ERROR:
            return {...state, fileError:true, filesUpdated: undefined}
        default:
            return state;
    }
};
