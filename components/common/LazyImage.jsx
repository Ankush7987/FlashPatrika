import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * LazyImage component for lazy loading images with a fade-in effect
 * Improves performance by only loading images when they enter the viewport
 * Handles image loading errors with fallback images
 * Enhanced with WebP support and better sizing
 */
const LazyImage = ({ src, alt, width, height, className, priority = false, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Generate blur placeholder for better perceived performance
  // Using a more optimized SVG placeholder with smaller size
  const [blurDataURL, setBlurDataURL] = useState(
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjNmNCIvPjwvc3ZnPg=='
  );
  
  // Cache image loading status to prevent unnecessary re-renders
  useEffect(() => {
    if (src) {
      // Check if this image was previously loaded successfully
      const cachedStatus = localStorage.getItem(`img_loaded_${src}`);
      if (cachedStatus === 'true') {
        setIsLoaded(true);
      }
    }
  }, [src]);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    
    // Cache the loading status for this image
    try {
      localStorage.setItem(`img_loaded_${src}`, 'true');
    } catch (e) {
      // Ignore storage errors
    }
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
  
  // Check if WebP is supported
  const [supportsWebP, setSupportsWebP] = useState(false);
  
  useEffect(() => {
    // Check WebP support once on client-side
    const checkWebPSupport = async () => {
      if (typeof window !== 'undefined') {
        const webpSupported = document.createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0;
        setSupportsWebP(webpSupported);
      }
    };
    
    checkWebPSupport();
  }, []);
  
  // Optimize image URL if possible
  const getOptimizedImageUrl = (url) => {
    if (!url) return '/images/default-news.jpg';
    
    // If already using Next.js Image optimization, return as is
    if (url.includes('_next/image')) return url;
    
    // For external images, add compression parameters if possible
    try {
      const urlObj = new URL(url);
      
      // Cloudinary optimization
      if (urlObj.hostname === 'res.cloudinary.com') {
        // Add WebP format if supported
        const format = supportsWebP ? 'f_webp' : 'f_auto';
        return url.replace('/upload/', `/upload/q_auto,${format},w_auto/`);
      }
      
      // For other domains, we rely on Next.js Image optimization
    } catch (e) {
      console.error('Error optimizing image URL:', e);
    }
    
    return url;
  };
  
  return (
    <div className="image-container">
      {isError && props.fill ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      ) : (
        <Image
          src={getOptimizedImageUrl(imgSrc)}
          alt={alt}
          width={width}
          height={height}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized={imgSrc.endsWith('.svg')} // Don't optimize SVGs
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
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