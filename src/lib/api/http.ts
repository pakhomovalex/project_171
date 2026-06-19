import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import 'dotenv/config';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

// ==================== AUTH CLIENT ====================
// Для эндпоинтов аутентификации (/auth/...)
export const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  withCredentials: true,
});

authClient.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError) => Promise.reject(error)
);

// ==================== HTTP CLIENT ====================
// Для всех остальных API-запросов (/users/, /projects/...)
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  withCredentials: true,
});

// Добавляем access token к каждому запросу
httpClient.interceptors.request.use(
  (config) => {
    const access = accessTokenService.getAccess();
    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Глобальная переменная для дедупликации refresh-запросов
let refreshPromise: Promise<string> | null = null;

httpClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Не 401 или уже retry — прокидываем дальше
    if (error.response?.status !== 401 || originalRequest._retry) {
      throw error;
    }

    // Не обрабатываем 401 на самом запросе refresh (если вдруг попадёт сюда)
    if (originalRequest.url?.includes('/token/refresh/')) {
      accessTokenService.remove();
      window.location.href = '/auth/log-in';
      throw error;
    }

    originalRequest._retry = true;

    // Дедупликация: если refresh уже в процессе — ждём его, не запускаем новый
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const refreshToken = accessTokenService.getRefresh();
        
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await authService.refresh(refreshToken);
        const { access, refresh } = response;

        accessTokenService.saveTokens(access, refresh);
        return access;
      })().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      const access = await refreshPromise;
      
      // Повторяем оригинальный запрос с новым токеном
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access}`;
      }
      
      return httpClient.request(originalRequest);
    } catch (refreshError) {
      // Refresh упал (токен протух, сервер отказал) — чистим и редиректим
      accessTokenService.remove();
      window.location.href = '/auth/log-in';
      throw refreshError;
    }
  }
);
// ==================== API МЕТОДЫ ====================

export const profileApi = {
  /**
   * Получить профиль текущего пользователя
   * GET /api/v1/profile
   */
  getProfile: () => httpClient.get('/profile/'),

  /**
   * Обновить профиль (JSON или FormData для файлов)
   * PATCH /api/v1/users/me/
   */
  updateProfile: (data: FormData | Record<string, unknown>) => {
    const isFormData = data instanceof FormData;
    
    return httpClient.patch('/profile/', data, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    });
  },
};