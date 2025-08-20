import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? `${import.meta.env.VITE_API_URL || 'https://invoice-server-9lnvk1470-ashudeepdubey8108gmailcoms-projects.vercel.app '}/api`
    : '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;