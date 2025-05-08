import React from 'react';
import Head from 'next/head';
import PicksForYou from './PicksForYou';
import YourTopics from './YourTopics';
import SourceNewsList from './news/SourceNewsList';
import CategoryNewsList from './news/CategoryNewsList';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BackToTop from './ui/BackToTop';

/**
 * HomeLayout component integrates the main content with the new UI elements
 * - Top wrapper containing Top Stories and Picks For You sidebar with source news
 * - Category sections below the top wrapper
 * - 'Your Topics' section at the bottom
 */
const HomeLayout = ({ children, categories = [] }) => {
  // Sample categories for demonstration - in a real app, these would be passed as props
  const defaultCategories = [
    { id: 'india', name: 'India' },
    { id: 'world', name: 'World' },
    { id: 'business', name: 'Business' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
    { id: 'health', name: 'Health' }
  ];
  
  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  
  const defaultTitle = 'NewsFlow - Latest News Updates';
  const defaultDescription = 'Get the latest news updates from around the world. Updated hourly.';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      {/* Top wrapper - contains both Top Stories and Sidebar */}
      <div className="top-wrapper">
        {/* Main content area (Top Stories) */}
        <div className="top-stories-section">
          {children}
        </div>
        
        {/* Sidebar with Picks for You and Source News - Source News is hidden on mobile and shown at bottom */}
        <div className="sidebar-section">
          <PicksForYou />
          <div className="mt-4 sm:mt-6 hidden md:block">
            <SourceNewsList title="News Sources" limit={5} />
          </div>
        </div>
      </div>
      {/* Your Topics section - appears below category sections */}
      <div className="my-6 sm:my-8 md:my-10">
        <YourTopics />
      </div>
      
      {/* Category Sections */}
      <div className="category-sections">
        {displayCategories.map(category => (
          <div key={category.id} className="category-section transition-all duration-300 hover:shadow-lg">
            <div className="category-wrapper">
              {/* Category news content */}
              <div className="category-content">
                <h2 className="category-title">{category.name}</h2>
                <CategoryNewsList category={category} limit={2} />
                <div className="read-more-container mt-3">
                  <a href={`/${category.id}`} className="read-more-link">
                    Read more <span className="read-more-arrow">→</span>
                  </a>
                </div>
              </div>
              
              {/* Category sidebar with source news - hidden on mobile */}
              <div className="category-sidebar hidden md:block">
                <SourceNewsList title={`${category.name} Sources`} limit={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* News Sources section - visible only on mobile, appears at the bottom */}
      <div className="block md:hidden mt-8 mb-4">
        <SourceNewsList title="News Sources" limit={5} />
      </div>
      
      </main>
      
      <Footer />
      <BackToTop />
      
      {/* Add CSS for the new layout components */}
      <style jsx global>{`
        /* Category sections styling */
        .category-sections {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        
        .category-section {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius);
          box-shadow: var(--card-shadow);
          padding: var(--spacing-md);
        }
        
        .category-wrapper {
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
          gap: var(--spacing-md);
        }
        
        .category-content {
          flex: 3;
        }
        
        .category-sidebar {
          flex: 1;
        }
        
        .category-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: font-size 0.3s ease;
        }
        
        @media (min-width: 640px) {
          .category-title {
            font-size: 1.25rem;
            margin-bottom: var(--spacing-md);
          }
        }
        
        .category-news-placeholder {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--input-bg);
          border-radius: var(--card-radius);
          padding: var(--spacing-md);
        }
        
        /* Source news styling */
        .source-news-list {
          margin-top: var(--spacing-md);
        }
        
        .source-list-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }
        
        .source-card {
          display: flex;
          align-items: center;
          padding: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
          border-radius: var(--card-radius);
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          min-height: 60px;
          touch-action: manipulation;
        }
        
        .source-card:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: var(--card-shadow-hover);
        }
        
        @media (hover: none) {
          .source-card:active {
            transform: translateY(-1px);
            box-shadow: var(--card-shadow-hover);
          }
        }
        
        /* Read More link styling */
        .read-more-container {
          margin-top: var(--spacing-md);
          text-align: right;
        }
        
        .read-more-link {
          display: inline-block;
          font-size: 0.875rem;
          color: var(--primary-color);
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          position: relative;
        }
        
        .read-more-arrow {
          display: inline-block;
          margin-left: 0.25rem;
          transition: transform 0.2s ease-in-out;
        }
        
        .read-more-link:hover {
          color: var(--primary-color-dark);
        }
        
        .read-more-link:hover .read-more-arrow {
          transform: translateX(3px);
        }
        
        .read-more-link:hover::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: var(--primary-color-dark);
          transform: scaleX(1);
          transform-origin: bottom left;
          transition: transform 0.3s ease-out;
        }
        
        .read-more-link:focus {
          outline: none;
          text-decoration: underline;
        }
        
        .source-logo {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          margin-right: var(--spacing-sm);
        }
        
        .source-logo-placeholder {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--input-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--text-secondary);
        }
        
        .source-content {
          flex: 1;
          min-width: 0; /* Ensures text truncation works */
        }
        
        .source-headline {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }
        
        .source-name {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        /* Responsive adjustments */
        @media (min-width: 640px) {
          .category-wrapper {
            padding: 0 1.5rem;
          }
        }
        
        @media (min-width: 768px) {
          .category-wrapper {
            flex-direction: row;
            padding: 0 2rem;
          }
          
          .category-content {
            width: 70%;
          }
          
          .category-sidebar {
            width: 30%;
            padding-left: var(--spacing-md);
          }
        }
        
        @media (min-width: 1024px) {
          .category-wrapper {
            padding: 0 3rem;
          }
        }
        
        /* Mobile-specific styles for news sources at bottom */
        @media (max-width: 768px) {
          .source-news-list {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
          }
        }
      `}</style>
    </div>
  );
};

export default HomeLayout;