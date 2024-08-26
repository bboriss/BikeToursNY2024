import axios from 'axios';
import apiEndpoints from '../config/apiEndpoints';
import { AppDispatch } from '../redux/store';
import { updateUser } from '../redux/slices/authSlice';

export const verifyTokenAndRefresh = async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const response = await axios.post(apiEndpoints.auth.refreshToken, { refreshToken });
      const { token, refreshToken: newRefreshToken, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', newRefreshToken);

      dispatch(updateUser({
        id: user.id,
        username: user.username,
        role: user.role,
      }));
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }
};
