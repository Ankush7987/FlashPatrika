import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LazyImage from '../common/LazyImage';
import { formatRelativeTime } from '../../utils/dateUtils';

const NewsCard = ({ news }) => {
  const {
    title,
    imageUrl,
    source,
    publishedAt,
    url
  } = news;
  
  // Animation effect when card appears
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Check if URL is external (starts with http or https)
  const isExternalLink = url && (url.startsWith('http://') || url.startsWith('https://'));
  
  // Wrapper component - either Link or a div
  const CardWrapper = ({ children }) => {
    if (isExternalLink) {
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          {children}
        </a>
      );
    } else if (news._id) {
      // Internal link using article ID
      return (
        <Link href={`/news/${news._id}`} passHref>
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
    <CardWrapper>
      <article className={`news-card flex flex-col sm:flex-row bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${isVisible ? 'fade-in' : ''} hover:-translate-y-1 touch-manipulation`}>
        {/* Thumbnail - responsive sizing with object-cover */}
        <div className="w-full sm:w-36 md:w-48 h-48 sm:h-36 md:h-48 relative mb-0 flex-shrink-0">
          {imageUrl ? (
            <div className="w-full h-full">
              <LazyImage 
                src={imageUrl} 
                alt={title}
                fill
                className="object-cover rounded-t-lg sm:rounded-t-none sm:rounded-l-xl md:rounded-l-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 144px, 192px"
                priority={false}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[var(--input-bg)] flex items-center justify-center rounded-t-lg sm:rounded-t-none sm:rounded-l-xl md:rounded-l-2xl">
              <span className="text-[var(--text-secondary)] text-xs sm:text-sm">No Image</span>
            </div>
          )}
        </div>
        
        {/* Content with better spacing and alignment */}
        <div className="w-full sm:w-[calc(100%-9rem)] md:w-[calc(100%-12rem)] p-3 sm:p-4 md:p-5 flex flex-col justify-between">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 line-clamp-2 text-[var(--text-primary)] hover:text-[var(--primary-color)] transition-colors">
            {title}
          </h2>
          
          <div className="mt-auto flex items-center text-xs sm:text-sm text-[var(--text-secondary)]">
            <span className="font-medium truncate max-w-[120px] sm:max-w-none">{source}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <time dateTime={publishedAt} className="truncate">{formatRelativeTime(publishedAt)}</time>
          </div>
        </div>
      </article>
    </CardWrapper>
  );
};

export default NewsCard;