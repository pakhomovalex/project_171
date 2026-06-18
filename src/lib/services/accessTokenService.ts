const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

export const accessTokenService = {
  getAccess: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_KEY);
    }
    return null;
  },

  getRefresh: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_KEY);
    }
    return null;
  },

  saveTokens: (access: string, refresh: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    }
  },

  saveAccess: (access: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_KEY, access);
    }
  },

  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    }
  },
};