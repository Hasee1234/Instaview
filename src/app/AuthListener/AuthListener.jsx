'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../Config/firebase'
import { setUser, clearUser } from '../Store/Slices/authSlice'
export default function AuthListener() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const dbUser = docSnap?.data();
        dispatch(setUser(dbUser));
      } else {
        dispatch(clearUser());
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return null // no UI needed
}
