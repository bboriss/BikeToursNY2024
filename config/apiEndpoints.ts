
const API_BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
  // You can add more endpoints as needed
  // example:
  // user: {
  //   profile: `${API_BASE_URL}/api/user/profile`,
  //   updateProfile: `${API_BASE_URL}/api/user/update-profile`,
  // },
};

export default apiEndpoints;