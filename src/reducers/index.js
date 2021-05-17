import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as matchReducer } from './match';
import { reducer as misMatchReducer } from './mismatch';
import { reducer as missingReducer } from './missing';
import { reducer as descriptionReducer } from './description';
import { reducer as formReducer } from 'redux-form';
import { reducer as targetReducer } from './target';
import { reducer as sourceReducer } from './source';
import { reducer as reconciliationReducer } from './reconciliation';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    descriptions: descriptionReducer,
    match: matchReducer,
    missing: missingReducer,
    mismatch: misMatchReducer,
    target: targetReducer,
    source: sourceReducer,
    reconciliation: reconciliationReducer
});

export default rootReducer;
