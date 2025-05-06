import React from 'react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsList = ({ news, loading, error }) => {
  // Generate skeleton loaders when loading
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="p-6 text-center bg-red-50 rounded-lg">
        <p className="text-red-500">Failed to load news. Please try again later.</p>
      </div>
    );
  }

  // Show message if no news available
  if (!news || news.length === 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No news available at the moment.</p>
      </div>
    );
  }

  // Split news into featured (top stories) and regular news
  const featuredNews = news.slice(0, 5); // Take first 5 items for featured section (as per requirement)
  const regularNews = news.slice(5); // Rest of the news

  // Group regular news by category
  const categories = ['India', 'World', 'Business', 'Technology', 'Sports', 'Entertainment'];
  const newsByCategory = {};
  
  // Initialize categories
  categories.forEach(category => {
    newsByCategory[category] = [];
  });
  
  // Distribute news to categories (simplified approach)
  regularNews.forEach((item, index) => {
    const categoryIndex = index % categories.length;
    newsByCategory[categories[categoryIndex]].push(item);
  });

  return (
    <div className="space-y-8">
      {/* Featured Top Stories */}
      <div className="featured-news">
        {featuredNews.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </div>
      
      {/* Category Sections */}
      {categories.map(category => {
        const categoryNews = newsByCategory[category];
        if (categoryNews.length === 0) return null;
        
        return (
          <div key={category} className="category-section">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="category-news">
              {categoryNews.slice(0, 3).map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
            <div className="text-right mt-2">
              <a href={`/${category.toLowerCase()}`} className="text-primary text-sm font-medium hover:underline">
                More {category} stories →
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;