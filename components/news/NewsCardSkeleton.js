import React from 'react';

const NewsCardSkeleton = () => {
  return (
    <article className="news-card flex flex-col md:flex-row skeleton-animation bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg">
      {/* Thumbnail skeleton - smaller size matching NewsCard */}
      <div className="w-full md:w-24 h-40 md:h-24 relative mb-0 flex-shrink-0">
        <div className="w-full h-full bg-[var(--input-bg)] rounded-t-lg md:rounded-l-lg md:rounded-tr-none"></div>
      </div>
      
      {/* Content skeleton - more compact with less padding */}
      <div className="w-full md:w-[calc(100%-6rem)] p-3 flex flex-col">
        {/* Title skeleton */}
        <div className="h-5 bg-[var(--input-bg)] rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-[var(--input-bg)] rounded w-1/2 mb-3"></div>
        
        {/* Meta info skeleton */}
        <div className="mt-auto flex items-center">
          <div className="h-3 bg-[var(--input-bg)] rounded w-16"></div>
          <div className="mx-2 h-3 w-3 rounded-full bg-[var(--input-bg)]"></div>
          <div className="h-3 bg-[var(--input-bg)] rounded w-24"></div>
        </div>
      </div>
    </article>
  );
};

export default NewsCardSkeleton;