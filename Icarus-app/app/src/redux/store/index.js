import { createStore } from "redux";
import rootReducer from "../reducers";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {

    key: 'persistedReducer',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// const store = createStore(rootReducer);
// console.log(store.getState()) 
// export default store;