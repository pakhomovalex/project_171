import { User } from "../utils/types/user";

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export const authStorage = {
  setTokens: (access: string, refresh: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  },

  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getUserId: (): number | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('userId');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
};