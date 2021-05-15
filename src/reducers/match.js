import {
    FETCH_MATCH
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_MATCH:
            return{ ...state, match: action.payload}
        default:
            return state;
    }
};
