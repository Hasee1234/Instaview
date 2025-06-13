import { db } from "@/app/Config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// delete post with authorization check
export const deletePost = createAsyncThunk(
  "feed/deletePost",
  async ({ postId, currentUserUid }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "Posts", postId);
      const postSnap = await getDoc(docRef);

      if (!postSnap.exists()) {
        return rejectWithValue("Post not found");
      }

      const post = postSnap.data();

      if (post.uid !== currentUserUid) {
        return rejectWithValue("Unauthorized: You cannot delete this post");
      }

      await deleteDoc(docRef);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get posts
export const getposts = createAsyncThunk("feed/getPost", async () => {
  try {
    const collectionRef = collection(db, "Posts");
    const docs = await getDocs(collectionRef);
    let data = [];
    docs.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
        createAt: doc.data().createAt?.toDate().toISOString() || null,
      });
    });
    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
});

// create post
export const createPost = createAsyncThunk(
  "feed/createPost",
  async (post, { rejectWithValue }) => {
    try {
      if (!post.uid) throw new Error("UID is missing in post data");
      const collectionRef = collection(db, "Posts");
      await addDoc(collectionRef, post);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.feed = [action.payload, ...state.feed];
      })
      .addCase(getposts.fulfilled, (state, action) => {
        state.feed = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.feed = state.feed.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.error("Delete post failed:", action.payload);
      });
  },
});

export default feedSlice.reducer;
