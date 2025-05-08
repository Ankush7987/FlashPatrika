import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggleButton from '../ui/ThemeToggleButton';

// Update the categories array to include all categories from YourTopics
const categories = [
  { name: 'Home', path: '/' },
  { name: 'India', path: '/india' },
  { name: 'World', path: '/world' },
  { name: 'Politics', path: '/politics' },
  { name: 'Business', path: '/business' },
  { name: 'Technology', path: '/tech' },
  { name: 'Sports', path: '/sports' },
  { name: 'Entertainment', path: '/entertainment' },
  { name: 'Health', path: '/health' },
  { name: 'Science', path: '/science' }
];

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { theme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--text-primary)',
        borderBottom: '1px solid var(--border-color)'
      }}>
    
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Top bar with logo and search */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src={theme === 'dark' ? "/images/flashpatrika-logo-dark.svg" : "/images/flashpatrika-logo.svg"} 
              alt="FlashPatrika News" 
              width={220} 
              height={60} 
              loading="eager"
              className="h-10 sm:h-14 w-auto transition-all duration-500" 
              style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.1))' : 'none' }}
              priority
            />
          </Link>
          
          {/* Theme toggle and mobile menu buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggleButton />
            <button 
              className="md:hidden p-2 rounded-full bg-[var(--input-bg)] text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors touch-manipulation"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - only visible when mobileMenuOpen is true */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[70vh] opacity-100 mb-3' : 'max-h-0 opacity-0'}`}>
          <div className="max-h-[70vh] overflow-y-auto py-2 px-1 bg-[var(--card-bg)] rounded-lg shadow-md border border-[var(--border-color)]">
            <ul className="flex flex-col space-y-1 py-1">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link 
                    href={category.path}
                    className={`block text-sm font-medium transition-all duration-300 py-2 px-3 rounded-md ${currentPath === category.path ? 'text-white font-bold bg-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-white hover:font-semibold hover:bg-[var(--primary-color)] hover:bg-opacity-70'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/trending"
                  className={`block text-sm font-medium transition-all duration-300 py-2 px-3 rounded-md flex items-center ${currentPath === '/trending' ? 'text-white font-bold bg-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-white hover:font-semibold hover:bg-[var(--primary-color)] hover:bg-opacity-70'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Trending</span>
                  <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-sm">Hot</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        {/* Desktop Navigation - improved for better scrolling and responsive design */}
        <nav className="hidden md:block overflow-x-auto pb-2 mt-3 relative">
          <div className="flex items-center justify-center px-1 py-1 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent scroll-smooth snap-x nav-categories">
            <ul className="flex flex-wrap md:flex-nowrap space-x-0.5 whitespace-nowrap px-1 mx-auto">
              {categories.map((category) => (
                <li key={category.path} className="snap-start flex-shrink-0 nav-category mb-1">
                  <Link 
                    href={category.path}
                    className={`text-sm font-medium transition-all duration-300 py-1 px-1.5 rounded-md flex items-center ${currentPath === category.path ? 'text-white font-bold bg-[var(--primary-color)] border-b-2 border-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-white hover:font-semibold hover:bg-[var(--primary-color)] hover:bg-opacity-70 hover:border-b-2 hover:border-[var(--primary-color)]'}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="snap-start flex-shrink-0 nav-category mb-1">
                <Link 
                  href="/trending"
                  className={`text-sm font-medium transition-all duration-300 py-1 px-1.5 rounded-md flex items-center ${currentPath === '/trending' ? 'text-white font-bold bg-[var(--primary-color)] border-b-2 border-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-white hover:font-semibold hover:bg-[var(--primary-color)] hover:bg-opacity-70 hover:border-b-2 hover:border-[var(--primary-color)]'}`}
                >
                  <span>Trending</span>
                  <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-sm">Hot</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Scroll indicators for better UX */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--header-bg)] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--header-bg)] to-transparent pointer-events-none"></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;