import React, { useState, useEffect } from 'react';
import SourceNewsCard from './SourceNewsCard';
import { useNews } from '../../context/NewsContext';
import { fetchNews } from '../../utils/api';

/**
 * SourceNewsList component displays a list of source-based news cards
 * Used in both sidebar and category sections
 */
const SourceNewsList = ({ title = 'News Sources', limit = 4 }) => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the news context for caching
  const { fetchSourceNews, isSourceLoading } = useNews();
  
  // Sample source logos with SVG fallback to avoid image optimization errors
  const sourceLogos = {
    'BBC News': '/images/sources/default-source.svg',
    'CNN': '/images/sources/default-source.svg',
    'The Times of India': '/images/sources/default-source.svg',
    'ESPN': '/images/sources/default-source.svg',
    'The Hindu': '/images/sources/default-source.svg',
    'NDTV': '/images/sources/default-source.svg',
    'Reuters': '/images/sources/default-source.svg',
    'Bloomberg': '/images/sources/default-source.svg'
  };
  
  useEffect(() => {
    const loadSourceNews = async () => {
      try {
        setLoading(true);
        // Get a list of popular sources
        const popularSources = Object.keys(sourceLogos);
        
        // Create a source map with one headline per source
        const sourceMap = {};
        
        // For each source, fetch one article to get the headline
        const fetchPromises = [];
        
        // Prepare all sources with initial data
        for (let i = 0; i < Math.min(popularSources.length, limit); i++) {
          const sourceName = popularSources[i];
          // Initialize the source with default data
          sourceMap[sourceName] = {
            id: sourceName.toLowerCase().replace(/\s+/g, '-'),
            name: sourceName,
            logo: sourceLogos[sourceName] || '/images/sources/default-source.svg',
            headline: `Loading news from ${sourceName}...`,
            loading: true
          };
          
          // Create a promise for each source fetch
          fetchPromises.push(
            fetchSourceNews(sourceName, 1, 1)
              .then(sourceData => {
                if (sourceData && sourceData.results && sourceData.results.length > 0) {
                  sourceMap[sourceName] = {
                    ...sourceMap[sourceName],
                    headline: sourceData.results[0].title || `Latest news from ${sourceName}`,
                    loading: false
                  };
                } else {
                  sourceMap[sourceName] = {
                    ...sourceMap[sourceName],
                    headline: `Latest news from ${sourceName}`,
                    loading: false
                  };
                }
              })
              .catch(err => {
                console.error(`Error fetching news for ${sourceName}:`, err);
                sourceMap[sourceName] = {
                  ...sourceMap[sourceName],
                  headline: `Latest news from ${sourceName}`,
                  loading: false,
                  error: true
                };
              })
          );
        }
        
        // Set initial sources with loading state
        const initialSourceList = Object.values(sourceMap);
        const uniqueInitialSources = [];
        const seenInitialSourceNames = new Set();
        
        for (const source of initialSourceList) {
          if (!seenInitialSourceNames.has(source.name)) {
            seenInitialSourceNames.add(source.name);
            uniqueInitialSources.push(source);
          }
        }
        
        setSources(uniqueInitialSources.slice(0, limit));
        setLoading(false); // Set main loading to false as we'll show individual loading states
        
        // Wait for all fetches to complete
        await Promise.allSettled(fetchPromises);
        
        // Update with final data
        const finalSourceList = Object.values(sourceMap);
        const uniqueSources = [];
        const seenSourceNames = new Set();
        
        for (const source of finalSourceList) {
          if (!seenSourceNames.has(source.name)) {
            seenSourceNames.add(source.name);
            uniqueSources.push(source);
          }
        }
        
        setSources(uniqueSources.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch source news:', err);
        setError('Failed to load sources');
      }
    };
    
    loadSourceNews();
  }, [limit]);

  return (
    <div className="source-news-list">
      {title && <h3 className="source-list-title">{title}</h3>}
      
      {loading && (
        <div className="space-y-3">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="source-card animate-pulse">
              <div className="source-logo">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-200"></div>
              </div>
              <div className="source-content">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="p-3 text-center bg-red-50 rounded-lg">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
      
      {!loading && !error && sources.length === 0 && (
        <div className="p-3 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm">No sources available</p>
        </div>
      )}
      
      {!loading && !error && sources.map((source) => (
        <div key={source.id} className="animate-fadeIn">
          {source.loading ? (
            <div className="source-card animate-pulse">
              <div className="source-logo">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="source-content">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <SourceNewsCard source={source} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SourceNewsList;