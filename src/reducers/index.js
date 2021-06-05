import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as formReducer } from 'redux-form';
import { reducer as sourceDescReducer } from './sourceDescription';
import { reducer as targetDescReducer } from './targetDescription';
import { reducer as reconciliationReducer } from './reconciliation';
import { reducer as filesUploadReducer } from './filesUpload';
import { reducer as resultFilesReducer } from './resultFile';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    sourceDesc: sourceDescReducer,
    targetDesc: targetDescReducer,
    reconciliation: reconciliationReducer,
    filesUpload: filesUploadReducer,
    resultFiles: resultFilesReducer
});

export default rootReducer;
