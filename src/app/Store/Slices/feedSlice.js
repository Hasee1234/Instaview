
// import { db } from "@/app/Config/firebase";
// import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove,query, where, orderBy  } from "firebase/firestore";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Add like to post and create notification
// export const likePost = createAsyncThunk(
//   "feed/likePost",
//   async ({ postId, userId, postOwnerId }, { rejectWithValue, dispatch }) => {
//     try {
//       const postRef = doc(db, "Posts", postId);
//       await updateDoc(postRef, {
//         likes: arrayUnion(userId)
//       });

//       // Only create notification if user is liking someone else's post
//       if (userId !== postOwnerId) {
//         // Get the sender's user data
//         const userDoc = await getDoc(doc(db, "Users", userId));
//         const userData = userDoc.exists() ? userDoc.data() : null;

//         const notification = {
//           type: "like",
//           senderId: userId,
//           senderName: userData?.username || userData?.displayName || "User",
//           receiverId: postOwnerId,
//           postId,
//           timestamp: new Date().toISOString(),
//           read: false,
//           message: "liked your post"
//         };
        
//         await addDoc(collection(db, "notifications"), notification);
//       }

//       return { postId, userId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Remove like from post
// export const unlikePost = createAsyncThunk(
//   "feed/unlikePost",
//   async ({ postId, userId }, { rejectWithValue }) => {
//     try {
//       const postRef = doc(db, "Posts", postId);
//       await updateDoc(postRef, {
//         likes: arrayRemove(userId)
//       });
//       return { postId, userId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Add comment to post and create notification
// export const addComment = createAsyncThunk(
//   "feed/addComment",
//   async ({ postId, comment, postOwnerId }, { rejectWithValue, dispatch }) => {
//     try {
//       // Only create notification if user is commenting on someone else's post
//       if (comment.userId !== postOwnerId) {
//         // Get the sender's user data
//         const userDoc = await getDoc(doc(db, "Users", comment.userId));
//         const userData = userDoc.exists() ? userDoc.data() : null;

//         const notification = {
//           type: "comment",
//           senderId: comment.userId,
//           senderName: userData?.username || userData?.displayName || "User",
//           receiverId: postOwnerId,
//           postId,
//           commentText: comment.text,
//           timestamp: new Date().toISOString(),
//           read: false
//         };
        
//         await addDoc(collection(db, "notifications"), notification);
//       }

//       const postRef = doc(db, "Posts", postId);
//       await updateDoc(postRef, {
//         comments: arrayUnion(comment)
//       });
//       return { postId, comment };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Follow user and create notification
// export const followUser = createAsyncThunk(
//   "feed/followUser",
//   async ({ followerId, followedId }, { rejectWithValue }) => {
//     try {
//       // Get the follower's user data
//       const followerDoc = await getDoc(doc(db, "Users", followerId));
//       const followerData = followerDoc.exists() ? followerDoc.data() : null;

//       // Create follow notification
//       const notification = {
//         type: "follow",
//         senderId: followerId,
//         senderName: followerData?.username || followerData?.displayName || "User",
//         receiverId: followedId,
//         timestamp: new Date().toISOString(),
//         read: false
//       };
      
//       await addDoc(collection(db, "notifications"), notification);

//       // Update both users' follow data
//       const followerRef = doc(db, "Users", followerId);
//       const followedRef = doc(db, "Users", followedId);

//       await updateDoc(followerRef, {
//         following: arrayUnion(followedId)
//       });

//       await updateDoc(followedRef, {
//         followers: arrayUnion(followerId)
//       });

//       return { followerId, followedId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



import { db } from "@/app/Config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove, query, where, orderBy } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Add like to post and create notification
export const likePost = createAsyncThunk(
  "feed/likePost",
  async ({ postId, userId, postOwnerId, senderName }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, {
        likes: arrayUnion(userId)
      });

      // Only create notification if user is liking someone else's post
      if (userId !== postOwnerId) {
        const notification = {
          type: "like",
          senderId: userId,
          senderName: senderName || "User",
          receiverId: postOwnerId,
          postId,
          timestamp: new Date().toISOString(),
          read: false,
          message: "liked your post"
        };
        await addDoc(collection(db, "notifications"), notification);
      }

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

// Add comment to post and create notification
export const addComment = createAsyncThunk(
  "feed/addComment",
  async ({ postId, comment, postOwnerId, senderName }, { rejectWithValue }) => {
    try {
      // Only create notification if user is commenting on someone else's post
      if (comment.userId !== postOwnerId) {
        const notification = {
          type: "comment",
          senderId: comment.userId,
          senderName: senderName || comment.username || "User",
          receiverId: postOwnerId,
          postId,
          commentText: comment.text,
          timestamp: new Date().toISOString(),
          read: false
        };
        await addDoc(collection(db, "notifications"), notification);
      }

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

// Follow user and create notification
export const followUser = createAsyncThunk(
  "feed/followUser",
  async ({ followerId, followedId, senderName }, { rejectWithValue }) => {
    try {
      // Create follow notification
      const notification = {
        type: "follow",
        senderId: followerId,
        senderName: senderName || "User",
        receiverId: followedId,
        timestamp: new Date().toISOString(),
        read: false
      };
      await addDoc(collection(db, "notifications"), notification);

      // Update both users' follow data
      const followerRef = doc(db, "Users", followerId);
      const followedRef = doc(db, "Users", followedId);

      await updateDoc(followerRef, {
        following: arrayUnion(followedId)
      });

      await updateDoc(followedRef, {
        followers: arrayUnion(followerId)
      });

      return { followerId, followedId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ...rest of your slice code remains unchanged...




// Delete post with authorization check
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

// Get posts
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

// Create post
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

// Get notifications for user
export const getNotifications = createAsyncThunk(
  "feed/getNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "notifications"),
        where("receiverId", "==", userId),
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return notifications;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  "feed/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
    notifications: [],
    unreadNotifications: 0
  },
  reducers: {
     addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadNotifications += 1;
    },
    incrementUnreadNotifications: (state) => {
      state.unreadNotifications += 1;
    },
    resetUnreadNotifications: (state) => {
      state.unreadNotifications = 0;
    }
  },
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
      })
      .addCase(followUser.fulfilled, (state, action) => {
        // Handle follow state updates if needed
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadNotifications = action.payload.filter(n => !n.read).length;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification) {
          notification.read = true;
          state.unreadNotifications = state.notifications.filter(n => !n.read).length;
        }
      });
  },
});

export const {addNotification, incrementUnreadNotifications, resetUnreadNotifications } = feedSlice.actions;
export default feedSlice.reducer;