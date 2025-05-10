import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children, title, description, ogImage }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  const defaultTitle = 'NewsFlow - Latest News Updates';
  const defaultDescription = 'Get the latest news updates from around the world. Updated hourly.';
  const defaultOgImage = '/images/og-image.jpg';

  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 ease-in-out"
         style={{
           color: 'var(--text-primary)',
           backgroundColor: `rgb(var(--background-rgb))`,
         }}>
    
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={ogImage || defaultOgImage} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Performance optimizations */}
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://news-api-9x6t.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://news-api-9x6t.onrender.com" />
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta httpEquiv="Cache-Control" content="public, max-age=3600, must-revalidate" />
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mt-2">
        {mounted && (
          <>
            {/* Top ad space */}
            {/* <div className="ads-space mb-6">
              <span>Ad Space</span>
            </div> */}
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main content */}
              <div className="w-full lg:w-3/4">
                {children}
              </div>
              
              {/* Sidebar */}
              <aside className="w-full lg:w-1/4">
                {/* <div className="ads-space sidebar sticky top-24">
                  <span>Sidebar Ad Space</span>
                </div> */}
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;