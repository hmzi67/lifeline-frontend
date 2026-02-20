import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { config } from '../config';
import type { ApiResponse, ApiError } from '../types/api.types';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API Endpoints Configuration
export const ENDPOINTS = {
  // Auth endpoints
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
  
  // Progress endpoints
  PROGRESS_SUMMARY: '/progress/summary',
  PROGRESS_CALORIES_INTAKE: '/progress/calories-intake',
  PROGRESS_EXERCISE_ACTIVE_DAYS: '/progress/exercise-active-days',
  PROGRESS_MEDICATION_STATS: '/progress/medication-stats',
  PROGRESS_CHALLENGES: '/progress/challenges',
  
  // App Settings endpoints
  APP_SETTINGS_LIST: '/app-settings',
  APP_SETTINGS_CREATE: '/app-settings',
  APP_SETTINGS_GET: '/app-settings/:id',
  APP_SETTINGS_UPDATE: '/app-settings/:id',
  APP_SETTINGS_DELETE: '/app-settings/:id',
  APP_SETTINGS_BY_KEY: '/app-settings/key/:key',
  APP_SETTINGS_BY_SCOPE: '/app-settings/scope/:scope',
  APP_SETTINGS_BULK_UPSERT: '/app-settings/bulk-upsert',
  
  // Add other existing endpoints as needed
};

export { api };
