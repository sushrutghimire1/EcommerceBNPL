import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as matchReducer } from './match';
import { reducer as misMatchReducer } from './mismatch';
import { reducer as missingReducer } from './missing';
import { reducer as featureReducer } from './feature';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    descriptions: featureReducer,
    match: matchReducer,
    missing: missingReducer,
    mismatch: misMatchReducer
});

export default rootReducer;
