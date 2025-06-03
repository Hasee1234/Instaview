import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../Config/firebase";
import {
  getDoc,
  doc,
  setDoc
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";

// Signup
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const saveUserTodb = {
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic,
        gender: user.gender,
        uid: userCredential.user.uid,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), saveUserTodb);
      return saveUserTodb;
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
      const dbUser = docSnap?.data();
      return dbUser;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Logout error", error);
      throw error;
    }
  }
);

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
