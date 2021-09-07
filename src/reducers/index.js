import { combineReducers } from 'redux';
import apiDataReducer from './apiDataReducer';
import appDataReducer from './appDataReducer';


const rootReducer = combineReducers({
    apiDataReducer: apiDataReducer,
    appDataReducer: appDataReducer,
});

export default rootReducer;