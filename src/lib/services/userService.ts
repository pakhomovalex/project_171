import { httpClient as client } from '../api/http';
import { User } from '../../utils/types/user';

// interface AuthData {
//   accessToken: string;
//   user: User;
// }

export const userService = {
  /**
   * Получить профиль текущего пользователя
   * GET /api/v1/profile/
   */
  getProfile: (): Promise<User> => client.get('/profile/'),

  /**
   * Обновить профиль (JSON — без смены аватара)
   * PATCH /api/v1/profile/
   */
  updateProfile: (data: Record<string, unknown>): Promise<User> => 
    client.patch('/profile/', data, {
      headers: { 'Content-Type': 'application/json' },
    }),

  /**
   * Обновить профиль с аватаром (FormData)
   * PATCH /api/v1/profile/
   */
  updateProfileWithAvatar: (data: FormData): Promise<User> => 
    client.patch('/profile/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};