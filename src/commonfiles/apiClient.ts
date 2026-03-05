import axios from "axios";
import  type { AxiosInstance } from "axios";


const apiClient: AxiosInstance = axios.create({
  baseURL: ' http://localhost:8081',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (JWT token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized – redirect to login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
