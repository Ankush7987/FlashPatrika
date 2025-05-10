import React from 'react';

/**
 * SkeletonLoader component for displaying loading placeholders
 * Improves perceived performance while content is loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of skeleton (text, card, image, etc.)
 * @param {number} props.lines - Number of text lines to display
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.height - Height of the skeleton
 * @param {number} props.width - Width of the skeleton
 */
const SkeletonLoader = ({ 
  type = 'text', 
  lines = 3, 
  className = '', 
  height, 
  width,
  ...props 
}) => {
  // Base skeleton styles
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';
  
  // Generate text lines
  const renderTextLines = () => {
    return Array(lines)
      .fill(0)
      .map((_, index) => (
        <div 
          key={`line-${index}`}
          className={`${baseClass} h-4 mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ));
  };
  
  // Render different skeleton types
  switch (type) {
    case 'card':
      return (
        <div 
          className={`${baseClass} ${className}`} 
          style={{ 
            height: height || '200px',
            width: width || '100%'
          }}
          {...props}
        >
          <div className="h-full w-full flex flex-col p-4">
            <div className={`${baseClass} h-24 w-full mb-4`} />
            {renderTextLines()}
          </div>
        </div>
      );
      
    case 'image':
      return (
        <div 
          className={`${baseClass} ${className}`}
          style={{ 
            height: height || '200px',
            width: width || '100%'
          }}
          {...props}
        />
      );
      
    case 'avatar':
      return (
        <div 
          className={`${baseClass} rounded-full ${className}`}
          style={{ 
            height: height || '40px',
            width: width || '40px'
          }}
          {...props}
        />
      );
      
    case 'button':
      return (
        <div 
          className={`${baseClass} ${className}`}
          style={{ 
            height: height || '36px',
            width: width || '100px'
          }}
          {...props}
        />
      );
      
    case 'text':
    default:
      return (
        <div className={className} {...props}>
          {renderTextLines()}
        </div>
      );
  }
};

export default SkeletonLoader;