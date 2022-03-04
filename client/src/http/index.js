/* eslint-disable no-param-reassign */
import axios from 'axios';
import { SERVER_URL } from '../config';

export const API_URL = `${SERVER_URL}/user`;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  // console.log(config);
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  config.headers.GamerId = `${localStorage.getItem('gamerId')}`;
  // console.log('config.headers.Authorization================================', config.headers);
  return config;
});

export default api;
