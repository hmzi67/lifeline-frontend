import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh endpoint (must be set up server-side)
        const res = await api.post('/auth/refresh');
        const newAccessToken = res.data.accessToken;

        // Save new access token
        localStorage.setItem('access_token', newAccessToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Optionally, logout user here
        localStorage.removeItem('access_token');
        window.location.href = '/login'; // or any logout logic
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;