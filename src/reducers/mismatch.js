import {
    FETCH_MISMATCH
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_MISMATCH:
            return{ ...state, mismatch: action.payload}
        default:
            return state;
    }
};
