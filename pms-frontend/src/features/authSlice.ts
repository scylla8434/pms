import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; role: string; token: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ email: string; role: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerSuccess(state, action: PayloadAction<{ email: string; role: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
