import {
    UPLOAD_SOURCE_CSV
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPLOAD_SOURCE_CSV:
            return { ...state, sourceCsvUpdated: true }
        default:
            return state;
    }
};
