/**
 * Utility for dynamic imports with loading and error states
 * This helps implement code splitting for non-critical components
 */
import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Default loading component shown while the dynamic component is loading
 */
const DefaultLoading = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md w-full h-full min-h-[100px] flex items-center justify-center">
    <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
  </div>
);

/**
 * Default error component shown if the dynamic component fails to load
 */
const DefaultError = () => (
  <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md">
    <p>Failed to load component</p>
  </div>
);

/**
 * Creates a dynamically imported component with custom loading and error states
 * @param {Function} importFunc - The import function (e.g., () => import('./Component'))
 * @param {Object} options - Configuration options
 * @param {React.Component} options.loading - Custom loading component
 * @param {React.Component} options.error - Custom error component
 * @param {Object} options.ssr - Server-side rendering options
 * @returns {React.Component} - The dynamically imported component
 */
export const dynamicComponent = (importFunc, options = {}) => {
  const {
    loading = DefaultLoading,
    error = DefaultError,
    ssr = false,
    ...restOptions
  } = options;

  return dynamic(importFunc, {
    loading,
    ssr,
    ...restOptions
  });
};

/**
 * Preloads a component for faster rendering when it's actually needed
 * @param {Function} importFunc - The import function to preload
 */
export const preloadComponent = (importFunc) => {
  // Only run on client
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        importFunc();
      });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        importFunc();
      }, 200);
    }
  }
};