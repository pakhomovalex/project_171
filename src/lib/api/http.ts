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
  (request: InternalAxiosRequestConfig) => {
    const accessToken = accessTokenService.get(); // или localStorage.getItem('accessToken')

    if (accessToken && request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Если отправляем FormData (файл), не трогаем Content-Type
    // axios сам установит multipart/form-data с boundary
    if (request.data instanceof FormData) {
      delete request.headers['Content-Type'];
    }

    return request;
  },
  (error) => Promise.reject(error)
);

// Обработка 401 + автоматический refresh
httpClient.interceptors.response.use(
  (res) => res.data,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Если ошибка не 401 или уже пытались обновить токен — пробрасываем дальше
    if (error.response?.status !== 401 || originalRequest._retry) {
      throw error;
    }

    originalRequest._retry = true;

    try {
      const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refreshToken') : null;

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Передаём refresh token как параметр
      const { refresh } = await authService.refresh(refreshToken);

      // Сохраняем новый токен
      accessTokenService.save(refresh);

      // Обновляем заголовок в оригинальном запросе и повторяем
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${refresh}`;
      }

      return httpClient.request(originalRequest);
    } catch (refreshError) {
      // Refresh не сработал — разлогиниваем
      accessTokenService.remove();
      // Можно добавить редирект на логин или событие
      window.location.href = '/login';
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