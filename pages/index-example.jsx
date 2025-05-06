import React from 'react';
import HomeLayout from '../components/HomeLayout';

/**
 * Example implementation of the homepage with the new Google News-style layout
 * This demonstrates how to use the HomeLayout component with existing content
 */
export default function Home() {
  // Mock data for main news articles - in a real app, this would come from an API
  const mainArticles = [
    {
      id: 1,
      title: 'Major breakthrough in renewable energy technology announced',
      excerpt: 'Scientists have developed a new method that could significantly increase solar panel efficiency...',
      category: 'Technology',
      publishedAt: 'Today, 10:30 AM'
    },
    {
      id: 2,
      title: 'Global economic forum addresses post-pandemic recovery strategies',
      excerpt: 'World leaders gathered to discuss collaborative approaches to economic challenges...',
      category: 'Business',
      publishedAt: 'Today, 9:15 AM'
    },
    {
      id: 3,
      title: 'New healthcare initiative aims to improve rural medical access',
      excerpt: 'The program will establish mobile clinics and telemedicine services in underserved areas...',
      category: 'Health',
      publishedAt: 'Yesterday, 4:45 PM'
    }
  ];

  return (
    <HomeLayout>
      {/* This is your existing main content */}
      <div className="main-news-feed">
        <h1 className="main-title">Latest News</h1>
        
        {mainArticles.map(article => (
          <div key={article.id} className="news-card">
            <h2 className="news-title">{article.title}</h2>
            <p className="news-excerpt">{article.excerpt}</p>
            <div className="news-meta">
              <span className="news-category">{article.category}</span>
              <span className="news-date">{article.publishedAt}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* The YourTopics component will be automatically included below */}
      {/* The PicksForYou sidebar will be automatically included on the right */}
    </HomeLayout>
  );
}