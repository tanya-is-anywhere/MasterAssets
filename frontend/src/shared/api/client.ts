import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const TOKEN_KEY = 'asset-similarity:token';
const REFRESH_KEY = 'asset-similarity:refresh';

export const client = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(TOKEN_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Автоматический refresh при 401 (незаметно для пользователя)
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableRequest | undefined;
    if (!original) return Promise.reject(error);

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = getRefreshToken();
      if (refresh) {
        try {
          // Отдельный axios, чтобы не зациклить interceptor
          const { data } = await axios.post('/api/v1/auth/refresh', {
            refresh_token: refresh,
          });

          setTokens(data.access_token, data.refresh_token);

          original.headers.Authorization = `Bearer ${data.access_token}`;
          return client(original);
        } catch {
          clearTokens();
        }
      }
    }

    return Promise.reject(error);
  },
);