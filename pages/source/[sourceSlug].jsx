import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchNews, fetchNewsBySource } from '../../utils/api';
import NewsCard from '../../components/news/NewsCard';
import NewsCardSkeleton from '../../components/news/NewsCardSkeleton';
import Link from 'next/link';

/**
 * SourcePage displays news articles from a specific source
 * This page is accessed when a user clicks on a source card
 */
export default function SourcePage() {
  const router = useRouter();
  const { sourceSlug } = router.query;
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sourceName, setSourceName] = useState('');
  
  useEffect(() => {
    // Only fetch data when sourceSlug is available (after hydration)
    if (!sourceSlug) return;
    
    const fetchSourceNews = async () => {
      try {
        setLoading(true);
        
        // Convert slug back to source name (simple conversion for demo)
        // In a real app, you might have a mapping or API endpoint for this
        const name = sourceSlug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        setSourceName(name);
        
        // Fetch news from this source using the dedicated function
        const data = await fetchNewsBySource(name, 1, 20);
        const sourceArticles = data.results;
        
        setArticles(sourceArticles);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch news for ${sourceSlug}:`, err);
        setError(`Failed to load news for this source`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSourceNews();
  }, [sourceSlug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" passHref>
          <div className="text-primary hover:underline inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </div>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        {sourceName ? `Latest News from ${sourceName}` : 'Source News'}
      </h1>
      
      {loading && (
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      )}
      
      {error && (
        <div className="p-6 text-center bg-red-50 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {!loading && !error && articles.length === 0 && (
        <div className="p-6 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">No news available from this source</p>
          <Link href="/" passHref>
            <div className="text-primary hover:underline mt-4 inline-block">
              Return to homepage
            </div>
          </Link>
        </div>
      )}
      
      {!loading && !error && articles.length > 0 && (
        <div className="space-y-6">
          {articles.map((article) => (
            <NewsCard key={article._id} news={article} />
          ))}
        </div>
      )}
    </div>
  );
}