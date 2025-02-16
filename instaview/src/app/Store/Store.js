import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./Slices/feedSlice"
export const store=configureStore({
    reducer:{
        feed:feedReducer
    }
})