import { create } from 'axios';

// Create re-usable axios instance
const apiClient = create({
  baseURL: 'https://www.tatd.in/app-api',
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // If we ever need to append Bearer tokens or device headers in the future, we can do it here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If response status is success but api returns validation flags, we handle it
    return response;
  },
  (error) => {
    // Propagate rejection to allow local handlers or utils/errorHandler to process it
    return Promise.reject(error);
  }
);

export default apiClient;
