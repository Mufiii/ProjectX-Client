import { combineReducers, configureStore } from "@reduxjs/toolkit"
import WorkspaceSlice from "./slices/WorkspaceSlice"
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"

const rootreducer = combineReducers({
    workspaces: WorkspaceSlice
})

const persistConfig = {
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig,rootreducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck:false
    })
    
})

export const persistor = persistStore(store) 




// import { configureStore } from "@reduxjs/toolkit"
// import educationSlice from "./slices/educationSlice"


// // const store = configureStore({
// //     reducer:educationSlice
// // })


// export default store