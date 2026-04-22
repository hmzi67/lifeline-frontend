import axios from 'axios';
import { config } from '../config';

// Create axios instance
const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true, // Needed to send refresh token cookie
});

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/blogs',
  '/blog-categories',
  '/health',
];

// Helper function to check if route is public
const isPublicRoute = (url: string): boolean => {
  return PUBLIC_ROUTES.some(route => url?.includes(route));
};

// Request interceptor: Add access token from localStorage
api.interceptors.request.use(
  (config) => {
    // Only add token if it's not a public route
    if (!isPublicRoute(config.url || '')) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401, try refresh, retry original request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh token for public routes
    if (isPublicRoute(originalRequest.url || '')) {
      return Promise.reject(error);
    }

    // Prevent infinite loops
    if (originalRequest.url === '/auth/refresh-token') {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh-token');
        const newAccessToken = res.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error('Invalid token refresh response from server.');
        }

        localStorage.setItem('token', newAccessToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // or any logout logic
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;