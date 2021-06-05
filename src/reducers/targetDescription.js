import {
    UPDATE_TARGET_DESC,
    RESET_TARGET_DESC
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_TARGET_DESC:
            return { ...state, target: action.payload }
        case RESET_TARGET_DESC:
            return { ...state, target: undefined }
        default:
            return state;
    }
};
