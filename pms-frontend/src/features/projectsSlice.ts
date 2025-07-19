import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const idx = state.projects.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.projects[idx] = action.payload;
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
