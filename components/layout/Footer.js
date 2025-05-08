import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="mt-6 sm:mt-8 md:mt-10 transition-colors duration-300 ease-in-out" style={{
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-primary)',
        borderTop: '1px solid var(--border-color)'
      }}>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-4">About Us</h3>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              NewsFlow delivers timely and accurate news from around the world. Our mission is to keep you informed with the latest updates across various categories.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/about" className="text-xs sm:text-sm hover:text-primary transition-colors block py-1" style={{ color: 'var(--text-secondary)' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs sm:text-sm hover:text-primary transition-colors block py-1" style={{ color: 'var(--text-secondary)' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs sm:text-sm hover:text-primary transition-colors block py-1" style={{ color: 'var(--text-secondary)' }}>
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-4">Contact Us</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li className="text-xs sm:text-sm py-1" style={{ color: 'var(--text-secondary)' }}>
                <span className="inline-block w-4 sm:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="ml-1 sm:ml-2">contact@newsflow.com</span>
              </li>
              <li className="text-sm py-1" style={{ color: 'var(--text-secondary)' }}>
                <Link href="/contact" className="hover:text-primary transition-colors block" style={{ color: 'var(--text-secondary)' }}>
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-4">Follow Us</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100076567396855&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://x.com/FlashPatrika?t=5_9elioMuzvmfG2xESsgvw&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/careercraft_advisors?igsh=Mnpyczd2NXkzemxz" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 text-center text-xs sm:text-sm" style={{ 
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)' 
        }}>
          &copy; {new Date().getFullYear()} NewsFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;