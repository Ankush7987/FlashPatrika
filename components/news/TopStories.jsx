import React, { useState, useEffect } from 'react';
import { fetchLatestNews } from '../../utils/api';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import LazyImage from '../common/LazyImage';

/**
 * TopStories component displays the main featured news articles
 * This appears in the top-left section of the homepage
 */
const TopStories = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestNews(1, 5); // Fetch 5 latest news articles
        setArticles(data.results);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch top stories:', err);
        setError('Failed to load top stories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopStories();
  }, []);

  // Display the first article as a featured article with larger image
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 0 ? articles.slice(1) : [];

  return (
    <section className="top-stories">
      <h1 className="top-stories-title text-[var(--text-primary)]">Top Stories</h1>
      
      {loading && (
        <div className="space-y-6">
          <div className="featured-article-skeleton animate-pulse">
            <div className="featured-image-skeleton"></div>
            <div className="featured-content-skeleton">
              <div className="h-6 bg-[var(--input-bg)] rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-[var(--input-bg)] rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-[var(--input-bg)] rounded w-1/4"></div>
            </div>
          </div>
          
          {[...Array(4)].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      {!loading && !error && articles.length === 0 && (
        <div className="p-4 text-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg">
          <p className="text-[var(--text-secondary)] text-sm">No top stories available</p>
        </div>
      )}
      
      {!loading && !error && featuredArticle && (
        <div className="featured-article">
          <div className="featured-image">
            {featuredArticle.imageUrl ? (
              <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" aria-label={featuredArticle.title}>
                <LazyImage 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  width={800}
                  height={400}
                  className="object-cover rounded-lg"
                  priority
                />
              </a>
            ) : (
              <div className="featured-image-placeholder">
                <span>No Image Available</span>
              </div>
            )}
          </div>
          <div className="featured-content">
            <h2 className="featured-title">
              <a 
                href={featuredArticle.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--primary-color)] transition-colors text-[var(--text-primary)]"
              >
                {featuredArticle.title}
              </a>
            </h2>
            <div className="featured-meta">
              <span className="featured-source text-[var(--text-secondary)]">{featuredArticle.source}</span>
              <span className="featured-dot text-[var(--text-secondary)]">•</span>
              <span className="featured-time text-[var(--text-secondary)]">{new Date(featuredArticle.publishedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
      
      {!loading && !error && remainingArticles.length > 0 && (
        <div className="remaining-articles">
          {remainingArticles.map((article) => (
            <NewsCard key={article._id} news={article} />
          ))}
        </div>
      )}
      
      <style jsx>{`
        .top-stories-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        
        .featured-article {
          margin-bottom: var(--spacing-lg);
        }
        
        .featured-image {
          margin-bottom: var(--spacing-sm);
          border-radius: var(--card-radius);
          overflow: hidden;
        }
        
        .featured-image-placeholder {
          width: 100%;
          height: 300px;
          background-color: var(--input-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.875rem;
          border-radius: var(--card-radius);
        }
        
        .featured-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          line-height: 1.4;
          color: var(--text-primary);
        }
        
        .featured-meta {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        .featured-dot {
          margin: 0 0.5rem;
        }
        
        .remaining-articles {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        
        /* Skeleton loading styles */
        .featured-article-skeleton {
          margin-bottom: var(--spacing-lg);
        }
        
        .featured-image-skeleton {
          width: 100%;
          height: 300px;
          background-color: var(--input-bg);
          border-radius: var(--card-radius);
          margin-bottom: var(--spacing-sm);
        }
        
        .featured-content-skeleton {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default TopStories;