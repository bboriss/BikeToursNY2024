import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks/authThunks';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    username: string | null;
    role: 'admin' | 'user' | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    username: null,
    role: null,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        username: null,
        role: null,
      };
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      document.cookie = 'jwtToken=; Max-Age=0; path=/';
    },
    updateUser: (state, action: PayloadAction<{ id: string; username: string; role: 'admin' | 'user' }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ id: string; username: string; role: 'admin' | 'user' }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ id: string; username: string; role: 'admin' | 'user' }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
