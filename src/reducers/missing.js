import {
    FETCH_MISSING
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_MISSING:
            return{ ...state, missing: action.payload}
        default:
            return state;
    }
};
