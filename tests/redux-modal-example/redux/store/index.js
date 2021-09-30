import { createStore } from "redux";
import coordReducer from '../reducers/coordReducer'
import rootReducer from "../reducers";

const store = createStore(rootReducer);
// console.log(store.getState()) => for debugg purposes
export default store;