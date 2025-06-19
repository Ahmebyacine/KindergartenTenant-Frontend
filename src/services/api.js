import axios from "axios";
import { getSubdomain } from "tldts";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

const tenantSubdomain = getSubdomain(window.location.hostname, {
  validHosts: ["localhost"],
});

api.interceptors.request.use((config) => {
  if (!tenantSubdomain) {
    return Promise.reject(
      new axios.Cancel("Can't act out of a tenant"),
    );
  }
  config.headers["x-tenant-id"] = tenantSubdomain;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;