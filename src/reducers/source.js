import {
    UPDATE_SOURCE_DESC,
    UPLOAD_SOURCE_CSV,
    UPLOAD_SOURCE_JSON
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_SOURCE_DESC:
            return { ...state, sourceDescUpdated: true }
        case UPLOAD_SOURCE_CSV:
            return { ...state, sourceCsvUpdated: true }
        case UPLOAD_SOURCE_JSON:
            return { ...state, sourceJsonUpdated: true }
        default:
            return state;
    }
};
