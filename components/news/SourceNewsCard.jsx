import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * SourceNewsCard component displays a small horizontal card with source logo and headline
 * Used in both sidebar and category sections
 */
const SourceNewsCard = ({ source }) => {
  const { id, name, logo, headline } = source;
  
  // Convert source name to slug for routing
  const sourceSlug = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link href={`/source/${sourceSlug}`} passHref>
      <div className="source-card">
        {/* Source logo (circular) */}
        <div className="source-logo">
          {logo ? (
            <Image 
              src={logo} 
              alt={`${name} logo`}
              width={50}
              height={50}
              className="rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="source-logo-placeholder">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Source content */}
        <div className="source-content">
          <h4 className="source-headline">{headline}</h4>
          <span className="source-name">{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default SourceNewsCard;