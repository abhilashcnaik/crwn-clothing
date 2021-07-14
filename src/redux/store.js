import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from "./root-reducer";

const middlewares = [];

console.log('environment ',process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store)

export default {store, persistor};