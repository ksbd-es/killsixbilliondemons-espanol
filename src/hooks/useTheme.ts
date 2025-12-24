import { useState, useEffect } from 'react';

export type Theme = 'original' | 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'original';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('theme-original', 'theme-light', 'theme-dark');

    // Add current theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return { theme, setTheme };
}

export const themes: Record<Theme, { name: string; colors: { bg: string; text: string } }> = {
  original: {
    name: 'Original',
    colors: { bg: '#191315', text: '#ea2f45' }
  },
  light: {
    name: 'Claro',
    colors: { bg: '#e8e8e8', text: '#000000' }
  },
  dark: {
    name: 'Oscuro',
    colors: { bg: '#1a1a1a', text: '#ea2f45' }
  }
};
