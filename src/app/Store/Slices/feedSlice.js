import { db } from "@/app/Config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc ,updateDoc, arrayUnion,arrayRemove} from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";






// Add like to post
export const likePost = createAsyncThunk(
  "feed/likePost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, {
        likes: arrayUnion(userId)
      });
      return { postId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove like from post
export const unlikePost = createAsyncThunk(
  "feed/unlikePost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, {
        likes: arrayRemove(userId)
      });
      return { postId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add comment to post
export const addComment = createAsyncThunk(
  "feed/addComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(comment)
      });
      return { postId, comment };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


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
      })
       .addCase(likePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const post = state.feed.find(post => post.id === postId);
        if (post) {
          if (!post.likes) post.likes = [];
          if (!post.likes.includes(userId)) {
            post.likes.push(userId);
          }
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const post = state.feed.find(post => post.id === postId);
        if (post && post.likes) {
          post.likes = post.likes.filter(id => id !== userId);
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.feed.find(post => post.id === postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push(comment);
        }
      });

  },
});

export default feedSlice.reducer;
