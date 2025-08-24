import { httpClient as client } from '../api/http';
import { User } from '../../types/user';

interface AuthData {
  accessToken: string;
  user: User;
}

export const userService = {
  getUser: (): Promise<AuthData> => client.get('/users'),

  changeAvatar: (avatar: string) => client.patch('/users/avatar', { avatar }, {
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  }),

  changeInfo: (data: object): Promise<User> => client.patch('/users/', data, {
    headers: {
      "Content-Type": 'application/json',
    }
  })
};