import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { fetchNewsBySource, cacheAPI } from '../utils/api';
import { dynamicComponent, preloadComponent } from '../utils/dynamicImport';

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

// Preload non-critical components
if (typeof window !== 'undefined') {
  // Preload components that will likely be needed soon
  setTimeout(() => {
    preloadComponent(() => import('../components/news/NewsCardSkeleton'));
    preloadComponent(() => import('../components/news/SourceNewsCard'));
  }, 2000); // Delay preloading to prioritize critical content
}

// News provider component
export const NewsProvider = ({ children }) => {
  // State for cached source news data
  const [sourceNewsCache, setSourceNewsCache] = useState({});
  
  // State for tracking loading status of each source
  const [loadingStates, setLoadingStates] = useState({});
  
  // State for tracking errors
  const [errors, setErrors] = useState({});
  
  // Track pending requests to implement request deduplication
  const pendingRequests = useMemo(() => ({}), []);
  
  // Function to fetch news by source with enhanced caching
  const fetchSourceNews = async (sourceName, page = 1, limit = 1) => {
    // Create a cache key based on source name, page, and limit
    const cacheKey = `${sourceName}-${page}-${limit}`;
    
    // If we already have this data cached and it's not expired, return it
    if (sourceNewsCache[cacheKey] && 
        sourceNewsCache[cacheKey].timestamp > Date.now() - 5 * 60 * 1000) { // 5 minute cache
      console.log(`Using in-memory cache for ${sourceName}`);
      return sourceNewsCache[cacheKey].data;
    }
    
    // Set loading state for this source
    setLoadingStates(prev => ({ ...prev, [sourceName]: true }));
    
    try {
      // Implement request deduplication - prevent multiple simultaneous requests for the same data
      if (!pendingRequests[cacheKey]) {
        pendingRequests[cacheKey] = fetchNewsBySource(sourceName, page, limit);
      }
      
      // Wait for the pending request to complete
      const data = await pendingRequests[cacheKey];
      
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
      
      // Clear the pending request
      delete pendingRequests[cacheKey];
      
      return data;
    } catch (error) {
      console.error(`Error fetching news for ${sourceName}:`, error);
      
      // Set error state
      setErrors(prev => ({ 
        ...prev, 
        [sourceName]: error.userMessage || `Failed to load news from ${sourceName}`
      }));
      
      // Clear the pending request on error
      delete pendingRequests[cacheKey];
      
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
    // Also clear localStorage cache
    cacheAPI.clearCache();
  };
  
  // Prefetch critical data on initial load
  useEffect(() => {
    // Prefetch top sources in the background
    const prefetchTopSources = async () => {
      try {
        // Prefetch top sources with a small limit to keep it light
        const topSources = ['bbc-news', 'cnn', 'the-hindu'];
        
        // Use Promise.all to fetch in parallel but with a delay to not block rendering
        setTimeout(() => {
          Promise.all(topSources.map(source => 
            fetchSourceNews(source, 1, 1).catch(err => console.log(`Prefetch error for ${source}:`, err))
          ));
        }, 3000); // Delay by 3 seconds to prioritize initial render
      } catch (error) {
        console.error('Error prefetching top sources:', error);
      }
    };
    
    prefetchTopSources();
  }, []);
  
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