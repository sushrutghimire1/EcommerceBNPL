import {
    UPDATE_SOURCE_DESC,
    RESET_SOURCE_DESC
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_SOURCE_DESC:
            return { ...state, source: action.payload }
        case RESET_SOURCE_DESC:
            return {...state, source: undefined}
        default:
            return state;
    }
};
