import { createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpoints from '../../config/apiEndpoints';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }, thunkAPI) => {
    try {
      const response = await axios.post(apiEndpoints.auth.register, userData);
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      document.cookie = `token=${token}; path=/`;

      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(apiEndpoints.auth.login, loginData);
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      document.cookie = `token=${token}; path=/`;

      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
