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
    localStorage.setItem("user", JSON.stringify(saveUserTodb));
    return saveUserTodb;
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
    const dbUser = docSnap?.data();
    localStorage.setItem("user", JSON.stringify(dbUser));
    return dbUser;
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    return true;
  }
);

// Load saved user from localStorage
const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  authChecked: false, // Whether the auth status has been checked (important for layout rendering)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.authChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.authChecked = true;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authChecked = true;
      });
  },
});

export const { setUser, clearUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
