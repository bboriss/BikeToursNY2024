const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`,
  },
  tours: `${API_BASE_URL}/tours`,
  getTourById: (id: string) => `${API_BASE_URL}/tours/${id}`,
};

export default apiEndpoints;
