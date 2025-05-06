import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if we're in the browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light';
    }
    return 'light';
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (isBrowser) {
      localStorage.setItem('theme', newTheme);
    }
  };

  // Apply theme class to document when theme changes
  useEffect(() => {
    if (isBrowser) {
      const root = window.document.documentElement;
      
      // Remove both classes first
      root.classList.remove('light-theme', 'dark-theme');
      
      // Add the current theme class
      root.classList.add(`${theme}-theme`);
    }
  }, [theme, isBrowser]);

  // Provide theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};