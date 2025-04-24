import { db } from "@/app/Config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


//getpost

export const getposts=createAsyncThunk(
    "feed/getPost",
    async()=>{
        try{
            const collectionRef=collection(db,"Posts")
            const docs=await getDocs(collectionRef)
            let data=[]
            console.log("docs",docs);
            docs.forEach((doc)=>{
                console.log("doc",doc.data());
                console.log("doc.id",doc.id);
                data.push({
                    id:doc.id,
                    ...doc.data(),
                    createAt: postData.createAt?.toDate().toISOString() || null
                })
                console.log("data",data);
            })
            return data
        }catch(error){
            console.log("error",error);
            
        }
    }
)


//createpost
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
    },
    extraReducers:(builder)=>{
        builder.addCase(createPost.fulfilled,(state,action)=>{
            state.feed=[action.payload,...state.feed]
        })
        .addCase(getposts.fulfilled,(state,action)=>{
            state.feed=action.payload
        })
    }
})
export default feedSlice.reducer