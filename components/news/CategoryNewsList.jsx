import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../utils/api';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import LazyImage from '../common/LazyImage';
import { formatRelativeTime } from '../../utils/dateUtils';

/**
 * CategoryNewsList component displays news articles for a specific category
 * Features:
 * - Fetches all available news for a category
 * - Displays loading skeleton during API fetch
 * - Shows error state if fetch fails
 * - Responsive layout for different screen sizes
 * - Uses lazy loading for images to improve performance
 */
const CategoryNewsList = ({ category, limit = 50 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        // If category is a string, use it directly, otherwise use category.name
        const categoryName = typeof category === 'string' ? category : category.name;
        const data = await fetchNews(categoryName, 1, limit);
        setArticles(data.results);
        setError(null);
      } catch (err) {
        const categoryName = typeof category === 'string' ? category : category.name;
        console.error(`Failed to fetch ${categoryName} news:`, err);
        setError(`Failed to load ${categoryName} news`);
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if we have a category
    if (category) {
      fetchCategoryNews();
    }
  }, [category, limit]);
  
  return (
    <div className="category-news-list">
      {loading && (
        <div className="space-y-4">
          {/* Show more skeleton cards during loading */}
          {[...Array(Math.min(8, limit))].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-red-300 dark:border-red-800 rounded-lg shadow-sm">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-[var(--primary-color)] hover:underline"
          >
            Try again
          </button>
        </div>
      )}
      
      {!loading && !error && articles.length === 0 && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-sm">
          <p className="text-[var(--text-secondary)]">No {typeof category === 'string' ? category : category.name} news available</p>
        </div>
      )}
      
      {!loading && !error && articles.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          {articles.map((article) => (
            <NewsCard key={article._id} news={article} />
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};



export default CategoryNewsList;