# CORS and API Configuration Guide

This guide explains how to configure the frontend and backend to work together both in local development and production environments (Vercel and Render).

## Backend CORS Configuration

The backend has been configured to accept requests from multiple origins:

- `http://localhost:3000` and other local development URLs
- `https://flash-patrika.vercel.app` (production Vercel frontend)

The CORS middleware in the backend allows:
- Credentials (if needed)
- GET, POST, PUT, DELETE and OPTIONS methods
- Common headers for API requests

## Frontend API URL Configuration

The frontend automatically detects the environment and uses the appropriate API URL:

1. In local development (localhost), it uses `http://localhost:3000/api`
2. On Vercel, it uses `https://news-api-9x6t.onrender.com/api`
3. It also handles environment variables and edge cases for different deployment scenarios

## Environment Variables

### For Local Development

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### For Vercel Deployment

Set these environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_API_BASE_URL=https://news-api-9x6t.onrender.com/api
```

## Next.js Configuration

The Next.js configuration includes:

1. CORS headers for development mode
2. URL rewrites for API requests in production
3. Environment variable handling
4. Image domains configuration for both environments

## Debugging CORS Issues

If you encounter CORS issues:

1. Check browser console for specific error messages
2. Verify the backend CORS configuration includes your frontend domain
3. Make sure credentials mode is consistent between frontend and backend
4. Check request headers in the browser's network tab

## Running in Different Environments

### Local Development

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to `http://localhost:3000`

### Production

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Ensure environment variables are set correctly in both platforms

## Troubleshooting

If API requests fail:

1. Check the browser console for detailed error messages
2. Verify the API URL being used (it's logged to console)
3. Test API endpoints directly using a tool like Postman
4. Verify CORS headers in the Network tab of browser dev tools 