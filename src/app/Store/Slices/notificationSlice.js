// features/notifications/notificationsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow";
  username: string;
  message: string;
  time: string;
};

const initialState = {
  notifications: [] as Notification[],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;