/* eslint-disable no-param-reassign */
import axios from 'axios';

export const API_URL = 'http://localhost:3001/user';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  console.log('config.headers.Authorization================================', config.headers);
  return config;
});

export default api;
