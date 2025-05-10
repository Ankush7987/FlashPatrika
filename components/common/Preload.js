import React from 'react';
import Head from 'next/head';
import { getApiBaseUrl } from '../../utils/api';

/**
 * Preload component for optimizing initial page load
 * - Implements DNS prefetching for external resources
 * - Preconnects to API domain
 * - Preloads critical assets
 * - Sets proper cache control headers
 */
const Preload = () => {
  const apiBaseUrl = getApiBaseUrl();
  const apiDomain = new URL(apiBaseUrl.startsWith('http') ? apiBaseUrl : `https://${apiBaseUrl}`).hostname;
  
  return (
    <Head>
      {/* DNS Prefetching */}
      <link rel="dns-prefetch" href={`//${apiDomain}`} />
      
      {/* Preconnect to API domain */}
      <link rel="preconnect" href={`//${apiDomain}`} crossOrigin="anonymous" />
      
      {/* Preload critical assets */}
      <link rel="preload" href="/images/flashpatrika-logo.svg" as="image" type="image/svg+xml" />
      <link rel="preload" href="/images/default-news.jpg" as="image" />
      
      {/* Cache control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600, s-maxage=3600" />
      
      {/* Preload critical fonts if any */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Head>
  );
};

export default Preload;