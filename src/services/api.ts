import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
  validateStatus: (status) => status >= 200 && status < 500, // Handle HTTP errors gracefully
});

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

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication required'));
    }
    if (!error.response) {
      return Promise.reject(new Error('Network error - Unable to connect to the server'));
    }
    return Promise.reject(error.response.data?.message || 'An unexpected error occurred');
  }
);

export const executeQuery = async <T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api({
      url: endpoint,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API request error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    }
    throw error;
  }
};

export default api;