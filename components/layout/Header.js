import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggleButton from '../ui/ThemeToggleButton';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'World', path: '/world' },
  { name: 'Politics', path: '/politics' },
  { name: 'Business', path: '/business' },
  { name: 'Technology', path: '/tech' },
  { name: 'Sports', path: '/sports' }
];

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // You would typically redirect to a search results page
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

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
              src="/logo.svg" 
              alt="NewsFlow Logo" 
              width={100} 
              height={32} 
              priority 
              className="h-8 sm:h-10 w-auto" 
            />
          </Link>
          
          {/* Search bar - hidden on mobile, visible on tablet and up */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-[var(--input-bg)] rounded-full px-3 py-1 w-1/3 transition-all duration-300 hover:shadow-sm focus-within:shadow-sm">
            <input 
              type="text" 
              placeholder="Search news..."
              className="bg-transparent border-none outline-none flex-grow text-sm text-[var(--text-primary)] min-w-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="ml-2 p-1 rounded-full hover:bg-[var(--border-color)] transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          
          {/* Mobile search button - visible only on mobile */}
          <button 
            className="md:hidden p-2 rounded-full bg-[var(--input-bg)] text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
            aria-label="Search"
            onClick={() => console.log('Mobile search clicked')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
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
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100 mb-3' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col space-y-3 py-2 px-1 bg-[var(--card-bg)] rounded-lg shadow-md border border-[var(--border-color)]">
            {categories.map((category) => (
              <li key={category.path}>
                <Link 
                  href={category.path}
                  className={`block text-sm font-medium transition-colors duration-300 py-2 px-3 rounded-md ${currentPath === category.path ? 'text-[var(--primary-color)] bg-[var(--input-bg)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)] hover:bg-[var(--input-bg)]'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/trending"
                className={`block text-sm font-medium transition-colors duration-300 py-2 px-3 rounded-md flex items-center ${currentPath === '/trending' ? 'text-[var(--primary-color)] bg-[var(--input-bg)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)] hover:bg-[var(--input-bg)]'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Trending</span>
                <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-sm">Hot</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent pb-1 mt-3">
          <ul className="flex space-x-6 whitespace-nowrap">
            {categories.map((category) => (
              <li key={category.path}>
                <Link 
                  href={category.path}
                  className={`text-sm font-medium transition-colors duration-300 py-2 px-1 ${currentPath === category.path ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--border-color)]'}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/trending"
                className={`text-sm font-medium transition-colors duration-300 py-2 px-1 flex items-center ${currentPath === '/trending' ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)] hover:border-b-2 hover:border-[var(--border-color)]'}`}
              >
                <span>Trending</span>
                <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-sm">Hot</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;