import axios from 'axios';
import { getToken } from './auth';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const tenantUsername = 'the_subdolain' // replace this the logique of subdomain name
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['x-tenant-id'] = tenantUsername;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;