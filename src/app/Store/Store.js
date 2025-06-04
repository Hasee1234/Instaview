import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./Slices/feedSlice"
import authReducer from "./Slices/authSlice"
export const store=configureStore({
    reducer:{
        feed:feedReducer,
        // authSlice:authReducer
        auth:authReducer
    }
})