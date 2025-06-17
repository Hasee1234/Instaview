// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { auth, db } from "../../Config/firebase";
// import {
//   getDoc,
//   doc,
//   setDoc
// } from 'firebase/firestore';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut
// } from "@firebase/auth";

// // Signup
// export const signUp = createAsyncThunk(
//   'auth/signUp',
//   async (user) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
//     const saveUserTodb = {
//       email: user.email,
//       name: user.name,
//       phone: user.phone,
//       address: user.address,
//       profilePic: user.profilePic,
//       gender: user.gender,
//       uid: userCredential.user.uid,
//     };
//     await setDoc(doc(db, "users", userCredential.user.uid), saveUserTodb);
//     localStorage.setItem("user", JSON.stringify(saveUserTodb));
//     return saveUserTodb;
//   }
// );

// // Login
// export const login = createAsyncThunk(
//   'auth/login',
//   async (user) => {
//     const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
//     const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
//     const dbUser = docSnap?.data();
//     localStorage.setItem("user", JSON.stringify(dbUser));
//     return dbUser;
//   }
// );

// // Logout
// export const logout = createAsyncThunk(
//   'auth/logout',
//   async () => {
//     await signOut(auth);
//     localStorage.removeItem("user");
//     return true;
//   }
// );

// // Load saved user from localStorage
// const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

// const initialState = {
//   user: savedUser ? JSON.parse(savedUser) : null,
//   authChecked: false, // Whether the auth status has been checked (important for layout rendering)
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       state.authChecked = true;
//     },
//     clearUser: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//       state.authChecked = true;
//     },
//     setAuthChecked: (state, action) => {
//       state.authChecked = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signUp.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.authChecked = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.authChecked = true;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         state.authChecked = true;
//       });
//   },
// });

// export const { setUser, clearUser, setAuthChecked } = authSlice.actions;
// export default authSlice.reducer;
// --- authSlice.js ---
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../Config/firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  getDocs,updateDoc,arrayRemove,arrayUnion
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";

// ----------------- Async Thunks ------------------

// authSlice.js
export const followUser = createAsyncThunk(
  'auth/followUser',
  async ({ currentUserId, targetUserId }, { rejectWithValue }) => {
    try {
      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);
      
      await updateDoc(currentUserRef, {
        following: arrayUnion(targetUserId)
      });
      
      await updateDoc(targetUserRef, {
        followers: arrayUnion(currentUserId)
      });
      
      return { currentUserId, targetUserId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async ({ currentUserId, targetUserId }, { rejectWithValue }) => {
    try {
      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);
      
      await updateDoc(currentUserRef, {
        following: arrayRemove(targetUserId)
      });
      
      await updateDoc(targetUserRef, {
        followers: arrayRemove(currentUserId)
      });
      
      return { currentUserId, targetUserId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Signup
export const signUp = createAsyncThunk(
  "auth/signUp",
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
  "auth/login",
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
  "auth/logout",
  async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    return true;
  }
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  }
);

// ----------------- Initial State ------------------

const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  allUsers: [],
  authChecked: false,
};

// ----------------- Slice ------------------

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
    updateUser: (state, action) => {
      state.user = action.payload;
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
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

// ----------------- Exports ------------------

export const { setUser, clearUser, setAuthChecked,updateUser } = authSlice.actions;
export default authSlice.reducer;
