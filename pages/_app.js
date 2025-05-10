import '../styles/globals.css'
import '../styles/topics.css'
import '../styles/categoryPage.css'
import '../styles/loader.css'
import Head from 'next/head'
import ErrorBoundary from '../components/common/ErrorBoundary'
import { ThemeProvider } from '../context/ThemeContext'
import { NewsProvider } from '../context/NewsContext'
import Preload from '../components/common/Preload'
import { useEffect, useState } from 'react'
import { cacheAPI } from '../utils/api'
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  // Clear expired cache entries on app initialization
  useEffect(() => {
    // Check if cache needs refreshing (once per session)
    const hasRefreshedCache = sessionStorage.getItem('cache_refreshed');
    if (!hasRefreshedCache) {
      // Clear expired cache entries
      cacheAPI.clearCache();
      sessionStorage.setItem('cache_refreshed', 'true');
    }
    
    // Add router event listeners for page transition loading states
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);
    
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <ThemeProvider>
      <Head>
        <title>FlashPatrika - Breaking News & Updates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Performance optimization meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="FlashPatrika - Your source for breaking news and updates from around the world" />
      </Head>
      <Preload />
      <ErrorBoundary>
        <NewsProvider>
          {loading && (
            <div className="page-transition-loader">
              <div className="loader-spinner"></div>
            </div>
          )}
          <Component {...pageProps} />
        </NewsProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default MyApp