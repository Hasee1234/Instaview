import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { auth,db } from "../../Config/firebase";
import { addDoc, collection, getDoc ,doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";

export const getCurrentUser=createAsyncThunk(
    'auth/currentUser',
    async(setLoading,store)=>{
        try {
            setLoading(true)
            onAuthStateChanged(auth,async(user)=>{
                if (user){
                    const uid=user.uid
                    const docSnap=await getDoc(doc(db,"users",uid))
                    const dbUser=docSnap?.data()
                    store.dispatch(setUser(dbUser));
                    setLoading(false)
                }else{
                    setLoading(false)
                }
                return
            })
        } catch (error) {
            setLoading(false)
            
        }
    }
)

export const logout=createAsyncThunk(
    'auth/logout',
    async()=>{
        try {
            await signOut(auth)
            return true
        } catch (error) {
            console.log("error",error);
            
        }
    }
)

export const login=createAsyncThunk(
    'auth/login',
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
    extraReducers:(builder)=>{
        builder.addCase(signUp.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        builder.addCase(logout.fulfilled,(state,action)=>{
            state.user=null
        })
        builder.addCase(getCurrentUser.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        
    }  

})
export const {setUser}=authSlice.actions
export default authSlice.reducer