import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'
import freeLancerSlice from "./freeLancerSlice.js";
import chatSlice from "./chatSlice.js";
import jobSlice from "./jobSlice.js";
import adminSlice from './adminSlice.js';
import govjobSlice from "./govJobSlice.js";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    // write code here...........
    auth: authSlice,
    freelancer: freeLancerSlice,
    chat: chatSlice,
    job: jobSlice,
    admin: adminSlice,
    gov: govjobSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;