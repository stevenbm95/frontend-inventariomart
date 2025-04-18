import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5002/api',
  // baseURL: import.meta.env.VITE_API_URL + '/api',
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 