const key = 'accessToken';

export const accessTokenService = {
  get: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  
  save: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, token);
    }
  },
  
  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};