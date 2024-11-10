import axios from 'axios';
import store, { RootState } from '../redux/store';
import { baseURL } from '@src/services/Env';

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  async config => {
    try {
      const state: RootState = store.getState();
      const token = state.auth.isToken;
      console.log('axios.interceptors - Token:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.headers['Content-Type'] === 'multipart/form-data') {
        delete config.headers['Content-Type'];
      }

      return config;
    } catch (error) {
      console.error('axios.interceptors - Request Error:', error);
      return Promise.reject(error);
    }
  },
  error => {
    console.log('axios.interceptors - Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);
