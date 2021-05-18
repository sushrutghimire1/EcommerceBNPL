import {
    UPDATE_SOURCE_DESC,
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_SOURCE_DESC:
            return { ...state, sourceDescUpdated: true }
        default:
            return state;
    }
};
