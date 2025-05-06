# NewsFlow Frontend

A fast, responsive, AdSense-friendly frontend like Google News that fetches data from a Node.js API and displays it in a clean layout.

## Tech Stack

- **Framework**: Next.js (React-based, SEO friendly)
- **Styling**: TailwindCSS (clean, responsive)
- **News fetch**: API calls from `/api/news` endpoint
- **Hosting**: Vercel (recommended)

## Features

- **Homepage** with latest 50 news sorted by publishedAt (newest first)
- **Category Pages** for India, World, Tech, Politics, Business, Sports, Health, Entertainment, Science
- **Responsive News Card Design** with thumbnail, title, source, and published time
- **SEO Optimization** with meta tags for each page
- **AdSense Ready** with designated ad spaces
- **Auto-refresh** every hour to keep content fresh
- **Mobile-First Design** that works well on all devices
- **Loading States** with skeleton loaders
- **Back to Top** floating button for better UX

## Project Structure

```
/frontend
  /components
    /layout      # Layout components (Header, Footer, etc.)
    /news        # News-related components (NewsCard, NewsList, etc.)
    /ui          # UI components (BackToTop, etc.)
  /pages         # Next.js pages
  /styles        # Global styles
  /utils         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd latestApiNews/frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the frontend directory with the following content:

```
API_BASE_URL=http://localhost:3000/api
```

Adjust the URL if your API is running on a different port or host.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Deployment

This project is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically build and deploy your application.

## Environment Variables

- `API_BASE_URL`: The base URL for the API endpoints (default: http://localhost:3000/api)