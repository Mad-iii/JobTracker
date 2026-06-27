import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jt_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jt_token");
      localStorage.removeItem("jt_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
