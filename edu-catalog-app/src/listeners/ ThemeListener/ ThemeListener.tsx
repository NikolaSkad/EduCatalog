import { useThemeStore } from '@/store/theme';
import { useEffect } from 'react';

const ThemeListener = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <></>;
};

export default ThemeListener;
