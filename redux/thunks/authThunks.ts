import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string
  }, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', loginData);
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);
