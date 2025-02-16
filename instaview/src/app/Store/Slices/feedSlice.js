import { db } from "@/app/Config/firebase";
import { addDoc, collection } from "firebase/firestore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const createPost=createAsyncThunk(
    "feed/createPost",
    async(post)=>{
        try{
            console.log("post",post);
            const collectionRef=collection(db,"Posts")
            const response=await addDoc(collectionRef,post)
            console.log("response",response);
            
            
        }catch(error){
            console.log("error",error);
            
        }
    return post    
    }
)

const feedSlice=createSlice({
    name:'feed',
    initialState:{
        feed:[],
    },
    reducers:{
        addFeed:(state,action)=>{
            console.log("action in addFeed",action.payload)
        },
    }
})
export default feedSlice.reducer