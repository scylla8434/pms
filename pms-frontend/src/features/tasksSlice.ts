import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  dueDate: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
