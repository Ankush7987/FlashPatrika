import React, { useState } from 'react';
import Image from 'next/image';

/**
 * LazyImage component for lazy loading images with a fade-in effect
 * Improves performance by only loading images when they enter the viewport
 * Handles image loading errors with fallback images
 */
const LazyImage = ({ src, alt, width, height, className, priority = false, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // Handle image error event
  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
    
    // Use appropriate fallback based on context
    if (src && src.includes('/sources/')) {
      // For source logos
      setImgSrc('/images/sources/default-source.svg');
    } else {
      // For news images
      setImgSrc('/images/default-news.jpg');
    }
  };
  
  return (
    <div className="image-container">
      {isError && props.fill ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized={imgSrc.endsWith('.svg')} // Don't optimize SVGs
          {...props}
        />
      )}
      
      <style jsx>{`
        .image-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        .lazy-image.loading {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .lazy-image.loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default LazyImage;