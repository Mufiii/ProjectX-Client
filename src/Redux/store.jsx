import { configureStore } from "@reduxjs/toolkit"
import educationSlice from "./slices/educationSlice"


const store = configureStore({
    reducer:educationSlice
})


export default store
