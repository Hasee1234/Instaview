'use client'

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import { setUser, clearUser, setAuthChecked } from '../Store/Slices/authSlice';

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch(setUser(userData));
          } else {
            dispatch(clearUser());
          }
        } catch (err) {
          console.error('Failed to fetch user from Firestore:', err);
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
      }
      dispatch(setAuthChecked(true));  // <- Mark auth checked regardless
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
