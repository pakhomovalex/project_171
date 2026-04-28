import { authClient as client } from '../api/http';
import { User } from '../../types/user';

interface AuthData {
  accessToken: string;
  user: User;
}

export const authService = {
  registration: (email: string, password: string, password2: string) => {
    return client.post('/registration/', { email, password, password2 });
  },

  activate: (email: string, token: string): Promise<AuthData> => {
    return client.get(`/activation/${email}/${token}`);
  },

  login: (email: string, password: string): Promise<AuthData> => {
    return client.post('/login/', { email, password });
  },

  logout: () => client.post('/logout/'),

  refresh: (refreshToken: string): Promise<AuthData> => client.post('/token/refresh/', { refresh: refreshToken}),

  verify: (token: string) => {
    return client.post('/token/verify/', { token });
  },

  changePassword: (newPassword: string) => {
    return client.post('/password/change/', { newPassword});
  },

  resetPassword: (email: string) => {
    return client.post('/password/reset/', { email });
  },

  confirmResetPassword: (newPassword: string, uId: number, token: string) => {
    return client.post('/password/confirm/', { newPassword, uId, token});
  },
};