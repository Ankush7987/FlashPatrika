# API Base URL Configuration Guide

This guide explains how the API base URL is determined in this application, which allows the same codebase to work both in local development and in production environments.

## How It Works

The application uses a dynamic approach to determine the API base URL. The logic follows this priority:

1. Use `REACT_APP_API_BASE_URL` from environment variables if available (for React apps)
2. Use `NEXT_PUBLIC_API_BASE_URL` from environment variables if available (for Next.js)
3. Detect the environment based on the hostname:
   - If hostname is `localhost` or `127.0.0.1`, use `http://localhost:3000/api`
   - Otherwise (production), use `https://news-api-9x6t.onrender.com/api`
4. Fall back to `process.env.API_BASE_URL` or `http://localhost:3000/api`

This logic is implemented in the `getApiBaseUrl()` function in `utils/api.js`.

## Environment Setup

### Local Development

For local development, no additional configuration is needed. The application will automatically use `http://localhost:3000/api` as the API base URL.

If you want to override this behavior, create a `.env.local` file in the frontend root directory with:

```
NEXT_PUBLIC_API_BASE_URL=http://your-custom-api-url
```

### Production Deployment (Vercel)

When deploying to Vercel or other hosting services, set the `NEXT_PUBLIC_API_BASE_URL` environment variable in the deployment settings:

```
NEXT_PUBLIC_API_BASE_URL=https://news-api-9x6t.onrender.com/api
```

## Troubleshooting

If you're experiencing API connection issues:

1. Check the browser console for messages like `Using API base URL: ...` to verify which URL is being used
2. Ensure your backend API is running and accessible at the expected URL
3. Check for CORS issues if the frontend and backend are on different domains
4. Verify that the environment variables are correctly set in your deployment settings

## Implementation Details

The implementation includes:

1. Dynamic URL detection in `utils/api.js`
2. Proper environment variable configuration in `next.config.js`
3. Server-side API route in `pages/api/contact.js` that handles different environments
4. CORS headers configuration for development mode

## Future Improvements

Potential improvements to this system:

1. Add environment-specific API key handling
2. Implement more sophisticated environment detection logic
3. Add health check endpoint to verify API connectivity 