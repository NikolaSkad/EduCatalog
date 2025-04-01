import { retriveFromLocalStorage, setLocalStorage } from '@/services/localstorage';
import { ThemeAction, ThemeState } from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const APP_THEME: string = 'APP_THEME';
const storedTheme: ThemeState['theme'] = retriveFromLocalStorage(APP_THEME) || 'dark';

export const useThemeStore = create<ThemeState & ThemeAction>()(
  devtools((set) => ({
    theme: storedTheme,
    setTheme: (theme) => {
      set({ theme });
      setLocalStorage(APP_THEME, theme);
    },
  })),
);
