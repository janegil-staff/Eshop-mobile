import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENV } from '../config/env';

const TOKEN_KEY = 'estore_jwt';

export const tokenStorage = {
  get: () => SecureStore.getItemAsync(TOKEN_KEY),
  set: (token) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

const client = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
});

client.interceptors.request.use(async (config) => {
  const token = await tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token invalid/expired — clear it. Re-auth happens at checkout.
      await tokenStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default client;