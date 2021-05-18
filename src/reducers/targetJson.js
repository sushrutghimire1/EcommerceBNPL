import {
    UPLOAD_TARGET_JSON
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPLOAD_TARGET_JSON:
            return { ...state, targetJsonUpdated: true }
        default:
            return state;
    }
};
