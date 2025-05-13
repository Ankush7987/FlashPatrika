import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchLatestNews } from '../../utils/api';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import LazyImage from '../common/LazyImage';

/**
 * TopStories component displays the main featured news articles
 * This appears in the top-left section of the homepage
 * Features:
 * - Initially loads only 6 articles
 * - Load More button to fetch additional articles
 * - Optional infinite scroll functionality
 */
const TopStories = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  
  // Initial articles per page (6 as requested)
  const INITIAL_LIMIT = 6;
  // How many more to load when clicking "Load More"
  const LOAD_MORE_LIMIT = 6;
  
  // Reference for infinite scroll observer
  const observer = useRef();
  const lastArticleRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && useInfiniteScroll) {
        loadMoreArticles();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore, useInfiniteScroll]);
  
  // Initial fetch of articles
  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestNews(1, INITIAL_LIMIT); // Fetch initial 6 articles
        setArticles(data.results);
        setHasMore(data.results.length === INITIAL_LIMIT && data.totalPages > 1);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch top stories:', err);
        // Use the user-friendly error message if available
        setError(err.userMessage || 'Failed to load top stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopStories();
  }, []);

  // Function to load more articles
  const loadMoreArticles = async () => {
    if (loadingMore || !hasMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await fetchLatestNews(nextPage, LOAD_MORE_LIMIT);
      
      if (data.results.length > 0) {
        setArticles(prevArticles => [...prevArticles, ...data.results]);
        setPage(nextPage);
        setHasMore(data.results.length === LOAD_MORE_LIMIT && nextPage < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load more stories:', err);
      // Don't show error for load more, just log it
    } finally {
      setLoadingMore(false);
    }
  };

  // Toggle between button and infinite scroll
  const toggleScrollMode = () => {
    setUseInfiniteScroll(!useInfiniteScroll);
  };

  // Display the first article as a featured article with larger image
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 0 ? articles.slice(1) : [];

  return (
    <section className="top-stories">
      <h1 className="top-stories-title text-[var(--text-primary)]">
        Top Stories
        <button 
          onClick={toggleScrollMode} 
          className="text-sm font-normal ml-4 text-[var(--primary-color)] hover:underline"
        >
          {useInfiniteScroll ? 'Use Load More Button' : 'Use Infinite Scroll'}
        </button>
      </h1>
      
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
          
          {[...Array(Math.min(5, INITIAL_LIMIT - 1))].map((_, index) => (
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
          {remainingArticles.map((article, index) => {
            // Add ref to last article for infinite scroll
            if (remainingArticles.length === index + 1) {
              return <div ref={lastArticleRef} key={article._id || index}>
                <NewsCard news={article} />
              </div>;
            } else {
              return <NewsCard key={article._id || index} news={article} />;
            }
          })}
        </div>
      )}
      
      {/* Load More Button (only show when not using infinite scroll and there are more articles) */}
      {!loading && !loadingMore && hasMore && !useInfiniteScroll && (
        <div className="load-more-container">
          <button 
            onClick={loadMoreArticles}
            className="load-more-button"
          >
            Load More
          </button>
        </div>
      )}
      
      {/* Loading indicator for when loading more articles */}
      {loadingMore && (
        <div className="loading-more">
          <div className="loading-spinner"></div>
          <p>Loading more stories...</p>
        </div>
      )}
      
      {/* Message when all articles are loaded */}
      {!loading && !loadingMore && !hasMore && articles.length > 0 && (
        <div className="no-more-articles">
          <p>You've reached the end of the stories</p>
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
          display: flex;
          align-items: center;
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
        
        /* Load More Button */
        .load-more-container {
          display: flex;
          justify-content: center;
          margin-top: var(--spacing-lg);
        }
        
        .load-more-button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: var(--card-radius);
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        
        .load-more-button:hover {
          background-color: var(--primary-color-dark, #0056b3);
        }
        
        /* Loading More Indicator */
        .loading-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: var(--spacing-lg);
          color: var(--text-secondary);
        }
        
        .loading-spinner {
          width: 2rem;
          height: 2rem;
          border: 3px solid var(--border-color);
          border-top-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 0.5rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* No More Articles Message */
        .no-more-articles {
          text-align: center;
          margin-top: var(--spacing-lg);
          padding: var(--spacing-md);
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
    </section>
  );
};

export default TopStories;