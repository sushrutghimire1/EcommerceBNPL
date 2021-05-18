import {
    UPLOAD_SOURCE_JSON
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPLOAD_SOURCE_JSON:
            return { ...state, sourceJsonUpdated: true }
        default:
            return state;
    }
};
