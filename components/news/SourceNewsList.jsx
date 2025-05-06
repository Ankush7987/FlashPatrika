import React, { useState, useEffect } from 'react';
import SourceNewsCard from './SourceNewsCard';
import { fetchNews, fetchNewsBySource } from '../../utils/api';

/**
 * SourceNewsList component displays a list of source-based news cards
 * Used in both sidebar and category sections
 */
const SourceNewsList = ({ title = 'News Sources', limit = 4 }) => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
    const fetchSourceNews = async () => {
      try {
        setLoading(true);
        // Get a list of popular sources
        const popularSources = Object.keys(sourceLogos);
        
        // Create a source map with one headline per source
        const sourceMap = {};
        
        // For each source, fetch one article to get the headline
        for (let i = 0; i < Math.min(popularSources.length, limit); i++) {
          const sourceName = popularSources[i];
          try {
            // Use a try-catch block for each source to prevent one failure from breaking all sources
            const sourceData = await fetchNewsBySource(sourceName, 1, 1);
            if (sourceData && sourceData.results && sourceData.results.length > 0) {
              sourceMap[sourceName] = {
                id: sourceName.toLowerCase().replace(/\s+/g, '-'),
                name: sourceName,
                logo: sourceLogos[sourceName] || '/images/sources/default-source.svg',
                headline: sourceData.results[0].title || `Latest news from ${sourceName}`
              };
            } else {
              // Add fallback data if no articles found
              sourceMap[sourceName] = {
                id: sourceName.toLowerCase().replace(/\s+/g, '-'),
                name: sourceName,
                logo: sourceLogos[sourceName] || '/images/sources/default-source.svg',
                headline: `Latest news from ${sourceName}`
              };
            }
          } catch (err) {
            console.error(`Error fetching news for ${sourceName}:`, err);
            // Still add the source with a default headline
            sourceMap[sourceName] = {
              id: sourceName.toLowerCase().replace(/\s+/g, '-'),
              name: sourceName,
              logo: sourceLogos[sourceName] || '/images/sources/default-source.svg',
              headline: `Latest news from ${sourceName}`
            };
          }
        }
        
        // Convert to array and limit to requested number
        const sourceList = Object.values(sourceMap).slice(0, limit);
        setSources(sourceList);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch source news:', err);
        setError('Failed to load sources');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSourceNews();
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
        <SourceNewsCard key={source.id} source={source} />
      ))}
    </div>
  );
};

export default SourceNewsList;