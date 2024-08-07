import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    username: string | null;
    role: 'admin' | 'user' | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    username: null,
    role: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; username: string; role: 'admin' | 'user' }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        username: null,
        role: null,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
