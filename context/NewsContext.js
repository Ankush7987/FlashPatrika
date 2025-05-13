import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchNewsBySource } from '../utils/api';

// Create a context for news data caching
const NewsContext = createContext();

// Custom hook to use the news context
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

// News provider component
export const NewsProvider = ({ children }) => {
  // State for cached source news data
  const [sourceNewsCache, setSourceNewsCache] = useState({});
  
  // State for tracking loading status of each source
  const [loadingStates, setLoadingStates] = useState({});
  
  // State for tracking errors
  const [errors, setErrors] = useState({});
  
  // Function to fetch news by source with caching
  const fetchSourceNews = async (sourceName, page = 1, limit = 1) => {
    // Create a cache key based on source name, page, and limit
    const cacheKey = `${sourceName}-${page}-${limit}`;
    
    // If we already have this data cached and it's not expired, return it
    if (sourceNewsCache[cacheKey] && 
        sourceNewsCache[cacheKey].timestamp > Date.now() - 5 * 60 * 1000) { // 5 minute cache
      return sourceNewsCache[cacheKey].data;
    }
    
    // Set loading state for this source
    setLoadingStates(prev => ({ ...prev, [sourceName]: true }));
    
    try {
      // Fetch fresh data
      const data = await fetchNewsBySource(sourceName, page, limit);
      
      // Cache the result with a timestamp
      setSourceNewsCache(prev => ({
        ...prev,
        [cacheKey]: {
          data,
          timestamp: Date.now()
        }
      }));
      
      // Clear any previous error
      setErrors(prev => ({ ...prev, [sourceName]: null }));
      
      return data;
    } catch (error) {
      console.error(`Error fetching news for ${sourceName}:`, error);
      
      // Set error state
      setErrors(prev => ({ 
        ...prev, 
        [sourceName]: error.userMessage || `Failed to load news from ${sourceName}`
      }));
      
      // Return cached data if available, even if expired
      if (sourceNewsCache[cacheKey]) {
        return sourceNewsCache[cacheKey].data;
      }
      
      throw error;
    } finally {
      // Clear loading state
      setLoadingStates(prev => ({ ...prev, [sourceName]: false }));
    }
  };
  
  // Function to check if a source is currently loading
  const isSourceLoading = (sourceName) => {
    return !!loadingStates[sourceName];
  };
  
  // Function to get error for a source
  const getSourceError = (sourceName) => {
    return errors[sourceName] || null;
  };
  
  // Function to clear cache for testing or forcing refresh
  const clearCache = () => {
    setSourceNewsCache({});
  };
  
  // Provide news cache and functions to children
  return (
    <NewsContext.Provider value={{ 
      sourceNewsCache,
      fetchSourceNews,
      isSourceLoading,
      getSourceError,
      clearCache
    }}>
      {children}
    </NewsContext.Provider>
  );
};