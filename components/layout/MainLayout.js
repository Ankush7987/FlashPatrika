import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * MainLayout component that wraps the entire application
 * Includes the sticky header and footer as requested
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pb-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;