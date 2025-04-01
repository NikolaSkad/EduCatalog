import { useThemeStore } from '@/store/theme';
import SunIcon from '@/assets/sun-icon.svg?react';
import MoonIcon from '@/assets/moon-icon.svg?react';

const ThemeToggler = () => {
  const { setTheme, theme } = useThemeStore();

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value={theme}
        onChange={() => {
          const newTheme = theme === 'light' ? 'dark' : 'light';
          setTheme(newTheme);
        }}
      />
      <SunIcon />
      <MoonIcon />
    </label>
  );
};

export default ThemeToggler;
