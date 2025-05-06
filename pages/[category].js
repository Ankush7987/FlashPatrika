import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CategoryNewsList from '../components/news/CategoryNewsList';
import YourTopics from '../components/YourTopics';
import BackToTop from '../components/ui/BackToTop';

/**
 * CategoryPage displays all news articles for a specific category
 * Features:
 * - Dynamic fetching of all news for the selected category
 * - Responsive grid layout for news cards
 * - "Your Topics" section for navigation to other categories
 * - Scroll-to-top button for better UX on long pages
 * - Lazy loading images for performance
 */
export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  
  // Format category for display
  const formatCategoryTitle = (cat) => {
    if (!cat) return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const categoryTitle = formatCategoryTitle(category);

  return (
    <Layout
      title={`${categoryTitle} News - NewsFlow`}
      description={`Latest ${categoryTitle} news and updates. Updated hourly.`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="category-header flex items-center justify-between mb-6 border-b border-[var(--border-color)] pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{categoryTitle} News</h1>
          <div className="flex items-center text-xs text-[var(--text-secondary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1 text-green-500 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Updated Hourly</span>
          </div>
        </div>

        {/* Display all news for the category with no limit */}
        <div className="news-grid mb-12">
          <CategoryNewsList category={category} limit={50} />
        </div>
        
        {/* Your Topics section */}
        <div className="your-topics-section mb-8">
          <YourTopics currentCategory={category} />
        </div>
      </div>
      
      {/* Scroll to top button - using the BackToTop component */}
      <BackToTop />
      
      <style jsx>{`
        .news-grid {
          min-height: 400px;
        }
      `}</style>
    </Layout>
  );
}