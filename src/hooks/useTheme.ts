import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

const THEME_KEY = 'infurizz_theme_mode';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return storage.get<'dark' | 'light'>(THEME_KEY, 'dark');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    storage.set(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
