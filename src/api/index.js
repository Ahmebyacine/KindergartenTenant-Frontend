import axios from "axios";
import { getSubdomain } from "tldts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let tenantSubdomain = getSubdomain(window.location.hostname, {
  validHosts: ["localhost"],
});

if (tenantSubdomain) {
  const parts = tenantSubdomain.split(".");
  if (parts.length > 1 && parts[1] === "staging") {
    tenantSubdomain = parts[0];
  }
}

api.interceptors.request.use(
  (config) => {
    if (!tenantSubdomain) {
      return Promise.reject(new axios.Cancel("Can't act out of a tenant"));
    }
    config.headers["x-tenant-id"] = tenantSubdomain;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
