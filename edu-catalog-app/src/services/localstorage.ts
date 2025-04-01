export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  localStorage.setItem(key, value);
};

export const retriveFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value && typeof value === 'object') {
      return JSON.parse(value);
    }
    return value;
  } catch (error) {
    return '';
  }
};

export const removeFromLocalstorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalstorage = () => {
  localStorage.clear();
  location.reload();
};

export const JWT_LS_KEY = 'jwt';
export const storeJwtInLocalStorage = (token: string) => setLocalStorage(JWT_LS_KEY, token);
export const getJwtFromLocalStorage = (): string => retriveFromLocalStorage(JWT_LS_KEY);
