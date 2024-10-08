const API_BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh-token`
  },
  tours: `${API_BASE_URL}/api/tours`,
  getTourById: (id: string) => `${API_BASE_URL}/api/tours/${id}`,
};

export default apiEndpoints;
