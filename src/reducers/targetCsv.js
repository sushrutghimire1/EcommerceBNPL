import {
    UPLOAD_TARGET_CSV,
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPLOAD_TARGET_CSV:
            return { ...state, targetCsvUpdated: true }
        default:
            return state;
    }
};
