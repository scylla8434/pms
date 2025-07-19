import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import projectsReducer from '../features/projectsSlice';
import tasksReducer from '../features/tasksSlice';
import teamsReducer from '../features/teamsSlice';
import notificationsReducer from '../features/notificationsSlice';
import filesReducer from '../features/filesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
    notifications: notificationsReducer,
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
