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

// Helper functions for theme detection and management
const getStoredTheme = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('theme');
  } catch (err) {
    console.error('Error accessing localStorage:', err);
    return null;
  }
};

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (err) {
    console.error('Error detecting system theme:', err);
    return 'light';
  }
};

const applyThemeClass = (theme) => {
  if (typeof window === 'undefined') return;
  const root = window.document.documentElement;
  
  // Remove both theme classes first
  root.classList.remove('light-theme', 'dark-theme');
  
  // Add the current theme class
  root.classList.add(`${theme}-theme`);
  
  // Handle dark class for Tailwind
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Set data attribute for CSS targeting
  root.setAttribute('data-theme', theme);
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Use useState with a function to avoid execution during SSR
  const [theme, setTheme] = useState('light'); // Default for SSR
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize theme on client-side only
  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = getStoredTheme();
    const preferredTheme = savedTheme || getSystemTheme();
    
    setTheme(preferredTheme);
    setIsInitialized(true);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {
      console.error('Error saving theme to localStorage:', err);
    }
  };

  // Apply theme class to document when theme changes
  useEffect(() => {
    if (isInitialized) {
      applyThemeClass(theme);
    }
  }, [theme, isInitialized]);
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (!getStoredTheme()) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Provide theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};