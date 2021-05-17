import {
    FETCH_RECONCILIATION,
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_RECONCILIATION:
            return { ...state, reconciliation: action.payload}
        default:
            return state;
    }
};
