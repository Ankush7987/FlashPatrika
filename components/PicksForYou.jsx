import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchNews } from '../utils/api';
import { formatRelativeTime } from '../utils/dateUtils';

/**
 * PicksForYou component displays a sidebar with personalized news recommendations
 * This appears on the right side of the homepage on desktop and collapses on mobile
 */
const PicksForYou = () => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch personalized news based on interests
  useEffect(() => {
    const fetchRecommendedNews = async () => {
      try {
        setLoading(true);
        // Fetch news from different categories to simulate personalized recommendations
        // In a real app, this would use user preferences or behavior data
        const categories = ['Technology', 'Business', 'Health', 'Science', 'Entertainment'];
        const data = await fetchNews(categories, 1, 10);
        setRecommendedArticles(data.results.slice(0, 5)); // Limit to 5 articles
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recommended news:', err);
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendedNews();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title text-[var(--text-primary)]">Picks for You</h2>
      
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="sidebar-card animate-pulse">
              <div className="sidebar-card-image bg-[var(--input-bg)]"></div>
              <div className="sidebar-card-content">
                <div className="h-4 bg-[var(--input-bg)] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[var(--input-bg)] rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      {!loading && !error && recommendedArticles.length === 0 && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg">
          <p className="text-[var(--text-secondary)] text-sm">No recommendations available</p>
        </div>
      )}
      
      {!loading && !error && recommendedArticles.map((article) => {
        // Check if URL is external (starts with http or https)
        const isExternalLink = article.url && (article.url.startsWith('http://') || article.url.startsWith('https://'));
        
        // Wrapper component - either Link or a div
        const CardWrapper = ({ children }) => {
          if (isExternalLink) {
            return (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                {children}
              </a>
            );
          } else if (article._id) {
            // Internal link using article ID
            return (
              <Link href={`/news/${article._id}`} passHref>
                <div className="cursor-pointer">
                  {children}
                </div>
              </Link>
            );
          } else {
            // Fallback if no URL or ID is available
            return <div>{children}</div>;
          }
        };
        
        return (
          <CardWrapper key={article._id}>
            <div className="sidebar-card bg-[var(--card-bg)] border border-[var(--border-color)] hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="sidebar-card-image"
                onError={(e) => {
                  e.target.src = "/images/default-news.jpg";
                }}
              />
              <div className="sidebar-card-content">
                <h3 className="sidebar-card-title">{article.title}</h3>
                <div className="sidebar-card-meta">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </CardWrapper>
        );
      })}
    </div>
  );
};

export default PicksForYou;