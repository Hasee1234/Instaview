import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/app/Config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

// Add a new story
export const addStory = createAsyncThunk('stories/addStory', async (storyData, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, 'Stories'), storyData);
    return { id: docRef.id, ...storyData };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Fetch all stories
// Fetch all stories
export const fetchStories = createAsyncThunk('stories/fetchStories', async (_, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'Stories'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const stories = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      stories.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        expiresAt: data.expiresAt?.toDate().toISOString() || null,
      });
    });

    return stories;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete a story
export const deleteStory = createAsyncThunk('stories/deleteStory', async (storyId, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'Stories', storyId));
    return storyId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const storySlice = createSlice({
  name: 'stories',
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload);
      })
      .addCase(addStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.stories = state.stories.filter((story) => story.id !== action.payload);
      });
  },
});

export default storySlice.reducer;
