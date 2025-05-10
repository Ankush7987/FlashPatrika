/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize image loading
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
    // Optimize image quality and formats
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression for better performance
  compress: true,
  // Optimize production builds
  swcMinify: true,
  // Configure HTTP caching headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|gif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
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