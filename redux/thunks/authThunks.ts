import { createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpoints from '../../config/apiEndpoints';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (
        userData: {
            firstName: string;
            lastName: string;
            username: string;
            email: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(apiEndpoints.auth.register, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiEndpoints.auth.login, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
