/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      's.espncdn.com', 
      'localhost', 
      'news-api-9x6t.onrender.com',
      'news-api-w60w.onrender.com',
      'render.com',
      'img.icons8.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    // Default API URL will be overridden by our dynamic logic in api.js
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    // Production API URL for Render
    NEXT_PUBLIC_RENDER_API_URL: 'https://news-api-w60w.onrender.com/api',
    // Flag to indicate if we're running in production
    NEXT_PUBLIC_IS_PRODUCTION: process.env.NODE_ENV === 'production' ? 'true' : 'false',
    // Vercel-specific environment detection
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development',
  },
  // Add CORS headers in development to prevent issues
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Ensure API requests work with render.com backend
  async rewrites() {
    return process.env.NODE_ENV === 'development' 
      ? [] // No rewrites in development
      : [
          {
            source: '/api/:path*',
            destination: 'https://news-api-w60w.onrender.com/api/:path*',
          },
        ];
  },
}

module.exports = nextConfig