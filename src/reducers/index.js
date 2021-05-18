import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as matchReducer } from './match';
import { reducer as misMatchReducer } from './mismatch';
import { reducer as missingReducer } from './missing';
import { reducer as descriptionReducer } from './description';
import { reducer as formReducer } from 'redux-form';
import { reducer as targetReducer } from './targetJson';
import { reducer as sourceJsonReducer } from './sourceJson';
import { reducer as sourceCsvReducer } from './sourceCsv';
import { reducer as sourceDescReducer } from './sourceDescription';
import { reducer as targetJsonReducer } from './targetJson';
import { reducer as targetCsvReducer } from './targetCsv';
import { reducer as targetDescReducer } from './targetDescription';
import { reducer as reconciliationReducer } from './reconciliation';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    descriptions: descriptionReducer,
    match: matchReducer,
    missing: missingReducer,
    mismatch: misMatchReducer,
    target: targetReducer,
    sourceJson: sourceJsonReducer,
    sourceCsv: sourceCsvReducer,
    sourceDesc: sourceDescReducer,
    targetJson: targetJsonReducer,
    targetCsv: targetCsvReducer,
    targetDesc: targetDescReducer,
    reconciliation: reconciliationReducer
});

export default rootReducer;
