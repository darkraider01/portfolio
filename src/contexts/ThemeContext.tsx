import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'light') {
      document.documentElement.style.setProperty('--terminal-bg', '#fafafa');
      document.documentElement.style.setProperty('--terminal-fg', '#2e3440');
      document.documentElement.style.setProperty('--nord1', '#e5e9f0');
      document.documentElement.style.setProperty('--nord3', '#d8dee9');
    } else {
      document.documentElement.style.setProperty('--terminal-bg', '#2e3440');
      document.documentElement.style.setProperty('--terminal-fg', '#e5e9f0');
      document.documentElement.style.setProperty('--nord1', '#3b4252');
      document.documentElement.style.setProperty('--nord3', '#4c566a');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}