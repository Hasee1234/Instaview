import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {createUserWithEmailPassword} from "firebase/auth";
import { auth,db } from "../../Config/firebase";
import { addDoc, collection, getDoc ,doc, setDoc} from 'firebase/firestore';

export const signUp=createAsyncThunk(
    'auth/signUp',
    async(user)=>{
        try {
            let userCredential = await
            createUserWithEmailPassword(auth,user.email,user.password)
            let saveUserTodb={
                email:user.email,
                name:user.name,
                phone:user.phone,
                address:user.address,
                profilePic:user.profilePic,
                gender:user.gender,
                uid:userCredential.user.uid
            }
            await setDoc(doc(db,"users",userCredential.user.uid),saveUserTodb)
            return saveUserTodb
        } catch (error) {
         console.log("error",error);
            
        }
    }
)

const initialState={
    user:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
      },

})
