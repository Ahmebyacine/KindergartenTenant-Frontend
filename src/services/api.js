import axios from "axios";
import { getToken } from "./auth";
import { getSubdomain } from "tldts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const tenantSubdomain = getSubdomain(window.location.hostname);

api.interceptors.request.use((config) => {
  if (!tenantSubdomain) {
    return Promise.reject(
      new axios.Cancel("Can't act out of a tenant"),
    );
  }

  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-tenant-id"] = tenantSubdomain;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
