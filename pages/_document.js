import { Html, Head, Main, NextScript } from 'next/document'
import ThemeScript from '../components/common/ThemeScript'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Theme script for preventing flash of incorrect theme */}
        <ThemeScript />
        
        {/* Font optimization */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          as="style" 
          crossOrigin="anonymous" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
          media="print" 
          onLoad="this.media='all'" 
        />
        
        {/* Performance optimization */}
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/flashpatrika-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/flashpatrika-favicon.svg" />
        
        {/* Resource hints for third-party domains */}
        <link rel="preconnect" href="https://news-api-9x6t.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://news-api-9x6t.onrender.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Service worker registration */}
        <script src="/sw-register.js" async defer />
        
        {/* Deferred non-critical scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Deferred script loading
              window.addEventListener('load', function() {
                // Load analytics or other non-critical scripts here
                setTimeout(function() {
                  // Example: load performance monitoring
                  console.log('Loading non-critical resources');
                }, 2000);
              });
            `
          }}
          async
          defer
        />
      </body>
    </Html>
  )
}