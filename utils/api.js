import axios from 'axios';
import { mockArticles, generateMockArticles, generateMockSourceArticles } from './mockData';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_PREFIX = 'newsflow_cache_';

// Cache utility functions
const cacheUtils = {
  // Get data from cache
  get: (key) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cacheKey = CACHE_PREFIX + key;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (!cachedData) return null;
      
      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;
      
      return isExpired ? null : data;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  },
  
  // Set data in cache
  set: (key, data) => {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheKey = CACHE_PREFIX + key;
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  },
  
  // Clear specific cache entry
  clear: (key) => {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheKey = CACHE_PREFIX + key;
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },
  
  // Clear all cache entries
  clearAll: () => {
    if (typeof window === 'undefined') return;
    
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Cache clearAll error:', error);
    }
  }
};

// Dynamic API base URL configuration
export const getApiBaseUrl = () => {
  // First priority: Use environment variable if available
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Second priority: Use Next.js environment variable
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // Third priority: Dynamic detection based on hostname
  const isClient = typeof window !== 'undefined';
  
  if (isClient) {
    const hostname = window.location.hostname;
    
    // Local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000/api';
    }
    
    // Vercel domain check
    if (hostname.includes('vercel.app')) {
      return 'https://news-api-w60w.onrender.com/api';
    }
    
    // Production deployment (default)
    return 'https://news-api-w60w.onrender.com/api';
  }
  
  // Server-side rendering or fallback
  if (process.env.VERCEL_URL) {
    return 'https://news-api-w60w.onrender.com/api';
  }
  
  return process.env.API_BASE_URL || 'http://localhost:3000/api';
};

// Get the appropriate API base URL
const API_BASE_URL = getApiBaseUrl();

console.log('Using API base URL:', API_BASE_URL);

// Set a timeout for API requests with CORS configuration
const axiosInstance = axios.create({
  timeout: 15000, // 15 seconds timeout (increased for production)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Set to true if your API requires credentials/cookies
});

// Export cache utilities for manual cache management
export const cacheAPI = {
  clearCache: cacheUtils.clearAll,
  clearCacheItem: cacheUtils.clear
};

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling and caching
axiosInstance.interceptors.response.use(
  response => {
    // Cache successful GET responses if they have a cacheKey in config
    if (response.config.method === 'get' && response.config.cacheKey) {
      cacheUtils.set(response.config.cacheKey, response.data);
    }
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the range of 2xx
      console.error('Response error:', error.response.status, error.response.data);
      
      // Add user-friendly error message based on status code
      if (error.response.status === 404) {
        error.userMessage = 'The requested resource was not found. Please try again later.';
      } else if (error.response.status === 403) {
        error.userMessage = 'You do not have permission to access this resource.';
      } else if (error.response.status >= 500) {
        error.userMessage = 'The server encountered an error. Please try again later.';
      } else {
        error.userMessage = error.response.data.message || 'An unexpected error occurred.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      error.userMessage = 'Unable to connect to the news server. Please check your internet connection and try again.';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      error.userMessage = 'Failed to send request. Please try again later.';
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch news with optional category filter
 * @param {String|Array} category - Optional category filter
 * @param {Number} page - Page number for pagination
 * @param {Number} limit - Number of items per page
 * @param {Number} retries - Number of retry attempts (default: 2)
 * @returns {Promise<Object>} - News data with pagination info
 */
export const fetchNews = async (category = null, page = 1, limit = 50, retries = 2) => {
  // Generate cache key based on parameters
  const categoryKey = category ? (Array.isArray(category) ? category.join(',') : category) : 'all';
  const cacheKey = `news_${categoryKey}_${page}_${limit}`;
  
  // Try to get from cache first
  const cachedData = cacheUtils.get(cacheKey);
  if (cachedData) {
    console.log(`Using cached news for ${categoryKey}`);
    return cachedData;
  }
  try {
    let url = `${API_BASE_URL}/news`;
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    
    if (category) {
      if (Array.isArray(category)) {
        // If multiple categories, join them with commas
        params.append('category', category.join(','));
      } else {
        params.append('category', category);
      }
    }
    
    try {
      const response = await axiosInstance.get(`${url}?${params.toString()}`);
      return response.data;
    } catch (apiError) {
      // Retry logic - attempt to retry the request if we have retries left
      if (retries > 0) {
        console.log(`Retrying request (${retries} attempts left)...`);
        // Wait for 1 second before retrying to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchNews(category, page, limit, retries - 1);
      }
      
      console.warn('API request failed after retries, using mock data:', apiError.message);
      
      // Use mock data as fallback
      let mockResults = [];
      
      if (category) {
        if (Array.isArray(category)) {
          // For multiple categories, get some mock articles for each
          category.forEach(cat => {
            mockResults = [...mockResults, ...generateMockArticles(cat, Math.ceil(limit / category.length))];
          });
        } else {
          // For single category
          mockResults = generateMockArticles(category, limit);
        }
      } else {
        // If no category specified, use general mock articles
        mockResults = [...mockArticles];
      }
      
      return {
        results: mockResults.slice(0, limit),
        total: mockResults.length,
        page,
        limit,
        isMockData: true // Flag to indicate this is mock data
      };
    }
  } catch (error) {
    console.error('Error in fetchNews:', error);
    // Propagate the error with user-friendly message
    throw error;
  }
};

/**
 * Fetch latest news
 * @param {Number} page - Page number for pagination
 * @param {Number} limit - Number of items per page
 * @param {Number} retries - Number of retry attempts (default: 2)
 * @returns {Promise<Object>} - Latest news data with pagination info
 */
export const fetchLatestNews = async (page = 1, limit = 50, retries = 2) => {
  // Generate cache key based on parameters
  const cacheKey = `latest_news_${page}_${limit}`;
  
  // Try to get from cache first
  const cachedData = cacheUtils.get(cacheKey);
  if (cachedData) {
    console.log('Using cached latest news');
    return cachedData;
  }
  try {
    const url = `${API_BASE_URL}/news/latest`;
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    
    try {
      const response = await axiosInstance.get(`${url}?${params.toString()}`);
      return response.data;
    } catch (apiError) {
      // Retry logic - attempt to retry the request if we have retries left
      if (retries > 0) {
        console.log(`Retrying latest news request (${retries} attempts left)...`);
        // Wait for 1 second before retrying to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchLatestNews(page, limit, retries - 1);
      }
      
      console.warn('Latest news API request failed after retries, using mock data:', apiError.message);
      
      // Use mock data as fallback
      return {
        results: mockArticles.slice(0, limit),
        total: mockArticles.length,
        page,
        limit,
        isMockData: true // Flag to indicate this is mock data
      };
    }
  } catch (error) {
    console.error('Error in fetchLatestNews:', error);
    // Propagate the error with user-friendly message
    throw error;
  }
};

/**
 * Fetch a specific news article by ID
 * @param {String} id - The ID of the news article
 * @returns {Promise<Object>} - News article data
 */
export const fetchNewsById = async (id) => {
  // Generate cache key based on article ID
  const cacheKey = `article_${id}`;
  
  // Try to get from cache first
  const cachedData = cacheUtils.get(cacheKey);
  if (cachedData) {
    console.log(`Using cached article ${id}`);
    return cachedData;
  }
  try {
    const url = `${API_BASE_URL}/news/${id}`;
    
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (apiError) {
      console.warn(`News by ID API request failed for ID ${id}, using mock data:`, apiError.message);
      
      // Find the article in mock data as fallback
      const mockArticle = mockArticles.find(article => article._id === id);
      
      if (mockArticle) {
        return mockArticle;
      } else {
        // Generate a mock article with this ID if not found
        return {
          _id: id,
          title: `Article ${id}`,
          description: 'This is a mock article description generated because the API request failed.',
          content: 'This is mock content for this article. In a real application, this would be the full article content fetched from the API.',
          source: 'Mock Source',
          category: 'general',
          publishedAt: new Date().toISOString(),
          url: 'https://example.com/article',
          imageUrl: '/images/default-news.jpg'
        };
      }
    }
  } catch (error) {
    console.error('Error in fetchNewsById:', error);
    return null;
  }
};

/**
 * Fetch news from a specific source
 * @param {String} source - Source name to filter by
 * @param {Number} page - Page number for pagination
 * @param {Number} limit - Number of items per page
 * @returns {Promise<Object>} - Source news data with pagination info
 */
export const fetchNewsBySource = async (source, page = 1, limit = 20) => {
  // Generate cache key based on source and pagination
  const cacheKey = `source_${source.toLowerCase()}_${page}_${limit}`;
  
  // Try to get from cache first
  const cachedData = cacheUtils.get(cacheKey);
  if (cachedData) {
    console.log(`Using cached news for source ${source}`);
    return cachedData;
  }
  try {
    // Try to fetch from API first
    try {
      // In a real app, you would have a dedicated endpoint for this
      // For now, we'll fetch all news and filter by source
      const data = await fetchNews(null, page, limit * 2);
      
      // Filter results by source
      // This is a client-side filter - in a production app, this would be done server-side
      const sourceArticles = data.results.filter(article => {
        // Case-insensitive comparison
        return article.source && article.source.toLowerCase() === source.toLowerCase();
      });
      
      return {
        ...data,
        results: sourceArticles.slice(0, limit),
        total: sourceArticles.length
      };
    } catch (apiError) {
      console.warn(`API request for source ${source} failed, using mock data:`, apiError.message);
      
      // Generate mock articles for this source
      const mockSourceArticles = generateMockSourceArticles(source, limit);
      
      return {
        results: mockSourceArticles,
        total: mockSourceArticles.length,
        page,
        limit
      };
    }
  } catch (error) {
    console.error(`Error in fetchNewsBySource for ${source}:`, error);
    // Return empty results instead of throwing
    return { results: [], total: 0, page, limit };
  }
};