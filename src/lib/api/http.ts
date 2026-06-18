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
httpClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      throw error;
    }

    originalRequest._retry = true;

    try {
      const refreshToken = accessTokenService.getRefresh();
      
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      // Запрашиваем новую пару токенов
      const response = await authService.refresh(refreshToken);
      
      // ВАЖНО: dj-rest-auth с ROTATE_REFRESH_TOKENS возвращает ОБА токена
      const { access, refresh } = response;

      // Сохраняем ОБА токена
      accessTokenService.saveTokens(access, refresh);

      // Повторяем запрос
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access}`;
      }

      return httpClient.request(originalRequest);

    } catch (refreshError) {
      accessTokenService.remove();
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