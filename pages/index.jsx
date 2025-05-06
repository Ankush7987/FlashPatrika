import React from 'react';
import HomeLayout from '../components/HomeLayout';
import TopStories from '../components/news/TopStories';

/**
 * Homepage with professional news website layout
 * Features:
 * - Top section with Top Stories and sidebar (Picks For You + Source News)
 * - Category sections with news and source cards
 * - Your Topics section at the bottom
 */
export default function Home() {
  return (
    <HomeLayout>
      <TopStories />
    </HomeLayout>
  );
}