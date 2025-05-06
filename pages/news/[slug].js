import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { fetchNewsById } from '../../utils/api';
import LazyImage from '../../components/common/LazyImage';
import { formatRelativeTime } from '../../utils/dateUtils';

export default function NewsDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when slug is available (after hydration)
    if (!slug) return;
    
    const fetchArticleDetails = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch the article by ID
        // For now, we'll redirect to the external URL if available in the query params
        const url = router.query.url;
        if (url) {
          window.open(url, '_blank');
          // Go back to previous page
          router.back();
          return;
        }
        
        // If no URL is provided, try to fetch the article by ID
        const data = await fetchNewsById(slug);
        if (data) {
          setArticle(data);
          setError(null);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error(`Failed to fetch article ${slug}:`, err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticleDetails();
  }, [slug, router]);

  // If we have an external URL, the useEffect will handle the redirect
  
  return (
    <Layout
      title={article ? `${article.title} - NewsFlow` : 'Article - NewsFlow'}
      description={article ? article.description || article.title : 'Read the full article on NewsFlow'}
    >
      <div className="container-centered mx-auto max-w-4xl px-4 py-8 bg-gray-100">
        {loading && (
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-6 text-center bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => router.back()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
        
        {!loading && !error && article && (
          <article className="bg-white rounded-xl shadow-md overflow-hidden">
            {article.imageUrl && (
              <div className="relative h-64 md:h-96 w-full">
                <LazyImage 
                  src={article.imageUrl} 
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="font-medium">{article.source}</span>
                <span className="mx-2">•</span>
                <time dateTime={article.publishedAt}>{formatRelativeTime(article.publishedAt)}</time>
              </div>
              
              {article.description && (
                <p className="text-lg leading-relaxed mb-6">{article.description}</p>
              )}
              
              {article.content && (
                <div className="prose max-w-none">
                  <p className="text-base leading-relaxed">{article.content}</p>
                </div>
              )}
              
              {article.url && (
                <div className="mt-8">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Read Full Article
                  </a>
                </div>
              )}
            </div>
          </article>
        )}
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    </Layout>
  );
}