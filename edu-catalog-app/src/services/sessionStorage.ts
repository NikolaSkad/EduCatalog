import { User } from '@/interface/user';

export const setSessionlStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value));
    return;
  }
  sessionStorage.setItem(key, value);
};

export const retriveFromSessionStorage = (key: string) => {
  try {
    const value = sessionStorage.getItem(key);
    if (value && typeof JSON.parse(value) === 'object') return JSON.parse(value);
    return value;
  } catch (error) {
    return '';
  }
};

export const removeFromSessionstorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
  location.reload();
};

export const USER_SS_KEY = 'user';
export const storeUserInSessionStorage = (user: User) => setSessionlStorage(USER_SS_KEY, user);
