import { combineReducers, configureStore } from "@reduxjs/toolkit"
import WorkspaceSlice from "./slices/WorkspaceSlice"
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import DevProfileSlice from "./slices/DevProfileSlice"
// import BoardSlice from "./slices/BoardSlice"
import WorkspaceDataSlice from "./slices/WorkspaceDataSlice"

const rootreducer = combineReducers({
    workspaces: WorkspaceSlice,
    DeveloperProfile: DevProfileSlice,
    workspacesData:WorkspaceDataSlice
    // spaceBoards:BoardSlice,
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
