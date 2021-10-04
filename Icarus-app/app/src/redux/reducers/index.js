import { combineReducers } from 'redux';
import coordReducer from './coordReducer'
import paramReducer from './paramReducer';
import tempResReducer from './temporalResReducer';
import dateReducer from './dateReducer';

import brandReducer from './brandReducer';

const rootReducer = combineReducers({
    coords: coordReducer,
    param: paramReducer,
    dates: dateReducer,
    tempRes: tempResReducer,
    brand: brandReducer,

})

export default rootReducer;
