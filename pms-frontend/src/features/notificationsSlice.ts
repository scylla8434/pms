import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find(n => n.id === action.payload);
      if (n) n.read = true;
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
