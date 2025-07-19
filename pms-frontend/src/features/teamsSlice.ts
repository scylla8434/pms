import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Team {
  id: string;
  name: string;
  members: string[];
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
    addTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
    updateTeam(state, action: PayloadAction<Team>) {
      const idx = state.teams.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.teams[idx] = action.payload;
    },
    deleteTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTeams, addTeam, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
