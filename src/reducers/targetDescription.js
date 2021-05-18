import {
    UPDATE_TARGET_DESC,
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_TARGET_DESC:
            return { ...state, targetDescUpdated: true }
        default:
            return state;
    }
};
