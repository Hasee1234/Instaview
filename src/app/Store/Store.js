import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./Slices/feedSlice"
import authReducer from "./Slices/authSlice"
import storiesReducer from "./Slices/storySlice"
export const store=configureStore({
    reducer:{
        feed:feedReducer,
        auth:authReducer,
        stories: storiesReducer,
    }
})