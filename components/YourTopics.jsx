import React from 'react';
import Link from 'next/link';

/**
 * YourTopics component displays clickable category cards in a responsive grid
 * Each card has an icon and name, with hover effects for better UX
 * @param {string} currentCategory - Optional current category to exclude from the list
 */
const YourTopics = ({ currentCategory = '' }) => {
  // Topics data with icons and IDs for navigation
  const topics = [
    {
      id: 'india',
      name: 'India',
      icon: '🇮🇳',
    },
    {
      id: 'world',
      name: 'World',
      icon: '🌎',
    },
    {
      id: 'tech',
      name: 'Technology',
      icon: '💻',
    },
    {
      id: 'business',
      name: 'Business',
      icon: '📈',
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: '🏆',
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: '🎬',
    },
    {
      id: 'health',
      name: 'Health',
      icon: '🏥',
    },
    {
      id: 'science',
      name: 'Science',
      icon: '🔬',
    }
  ];

  // Filter out the current category if provided
  const filteredTopics = currentCategory 
    ? topics.filter(topic => topic.id.toLowerCase() !== currentCategory.toLowerCase())
    : topics;

  return (
    <section className="topics-section my-4 sm:my-6 md:my-8">
      <h2 className="topics-title text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[var(--text-primary)]">Your Topics</h2>
      <div className="topics-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredTopics.map((topic) => (
          <Link 
            key={topic.id} 
            href={`/${topic.id}`}
            className="topic-card bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow-md border border-[var(--border-color)] transition-all duration-300 p-3 sm:p-4 text-center hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer touch-manipulation"
            aria-label={`View ${topic.name} news`}
          >
            <div className="topic-icon text-xl sm:text-2xl mb-1 sm:mb-2">{topic.icon}</div>
            <h3 className="topic-name font-medium text-sm sm:text-base text-[var(--primary-color)]">{topic.name}</h3>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .topic-card {
          min-height: 90px;
        }
        
        .topic-card:hover .topic-icon {
          transform: scale(1.1);
        }
        
        .topic-icon {
          transition: transform 0.3s ease;
        }
        
        @media (min-width: 640px) {
          .topic-card {
            min-height: 110px;
          }
        }
        
        @media (min-width: 768px) {
          .topic-card {
            min-height: 120px;
          }
        }
        
        @media (hover: none) {
          .topic-card:active {
            transform: translateY(-1px);
            box-shadow: var(--card-shadow-hover);
          }
          
          .topic-card:active .topic-icon {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};

export default YourTopics;