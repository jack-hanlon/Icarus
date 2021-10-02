import { combineReducers } from 'redux';
import coordReducer from './coordReducer'
import paramReducer from './paramReducer';

const rootReducer = combineReducers({
    coords: coordReducer,
    param: paramReducer,
    
})

export default rootReducer;