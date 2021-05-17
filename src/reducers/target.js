import {
    UPDATE_TARGET_DESC,
    UPLOAD_TARGET_CSV,
    UPLOAD_TARGET_JSON
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_TARGET_DESC:
            return { ...state, targetDescUpdated: true }
        case UPLOAD_TARGET_CSV:
            return { ...state, targetCsvUpdated: true }
        case UPLOAD_TARGET_JSON:
            return { ...state, targetJsonUpdated: true }
        default:
            return state;
    }
};
