import { combineReducers, configureStore } from "@reduxjs/toolkit"
import WorkspaceSlice from "./slices/WorkspaceSlice"
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import DevProfileSlice from "./slices/DevProfileSlice"
// import BoardSlice from "./slices/BoardSlice"
import WorkspaceDataSlice from "./slices/WorkspaceDataSlice"
import BoardDataSlice from "./slices/BoardDataSlice"
import  projectSlice  from './slices/ProjectSlice'
import ProjectDetailSlice from "./slices/ProjectDetailSlice"
import FetchAlldevSlice from "./slices/FetchAlldevSlice"

const rootreducer = combineReducers({
    workspaces: WorkspaceSlice,
    DeveloperProfile: DevProfileSlice,
    workspacesData:WorkspaceDataSlice,
    board:BoardDataSlice,
    projects: projectSlice,
    projectDetail:ProjectDetailSlice,
    AllDevelopers:FetchAlldevSlice,
})

const persistConfig = {
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig,rootreducer)
// const logger = createLogger();
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck:false
    })
    
})

export const persistor = persistStore(store) 
