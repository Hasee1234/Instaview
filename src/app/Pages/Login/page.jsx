"use client";
import React, { useState } from 'react'
import { login } from '@/app/Store/Slices/authSlice'
import {useDispatch} from 'react-redux'
import { useRouter } from 'next/navigation';

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch=useDispatch()
    const router=useRouter()

    const handleLogin=()=>{
        let user={
            email,
            password
        }
        dispatch(login(user))
    }

    const handleRegister=()=>{
        console.log("register");
        router.push('/Signup')
        
    }
  return (
    <div>
    <h1>Login Page</h1>
    <input type="email" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
    <br/>
    <input type="password" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
     <button onClick={handleLogin}>Login</button>
     <br />
     <button onClick={handleRegister}>Register</button>
</div>
  )
}

export default Page
