import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { auth,db } from "../../Config/firebase";
import { addDoc, collection, getDoc ,doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

export const Login=createAsyncThunk(
    'auth/Login',
    async(user)=>{
        try {
            const userCredential = await signInWithEmailAndPassword(auth,user.email,user.password)
            const docSnap=await getDoc(doc(db,"users",userCredential.user.uid))
            const dbUser=docSnap?.data()
            return dbUser
        } catch (error) {
            console.log("error",error);
            
        }
    }
)

export const signUp=createAsyncThunk(
    'auth/signUp',
    async(user)=>{
        try {
            let userCredential = await
            createUserWithEmailAndPassword
            (auth,user.email,user.password)
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
export const {setUser}=authSlice.actions
export default authSlice.reducer