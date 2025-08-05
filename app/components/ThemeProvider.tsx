'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: 'dark' | 'light' | undefined;
  resolvedTheme: 'dark' | 'light' | undefined;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  systemTheme: undefined,
  resolvedTheme: undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'qrcraft-theme',
  attribute = 'class',
  enableSystem: _enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | undefined>(undefined);
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light' | undefined>(undefined);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      const isDark = mediaQuery.matches;
      setSystemTheme(isDark ? 'dark' : 'light');
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Disable transitions temporarily if needed
    if (disableTransitionOnChange) {
      root.classList.add('[&_*]:!transition-none');
      setTimeout(() => {
        root.classList.remove('[&_*]:!transition-none');
      }, 1);
    }

    // Determine the resolved theme
    let newResolvedTheme: 'dark' | 'light';
    if (theme === 'system') {
      newResolvedTheme = systemTheme || 'light';
    } else {
      newResolvedTheme = theme;
    }

    setResolvedTheme(newResolvedTheme);

    // Apply the theme
    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);
    } else {
      root.setAttribute(attribute, newResolvedTheme);
    }
  }, [theme, systemTheme, attribute, disableTransitionOnChange]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    systemTheme,
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};