'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import CatalogueDownloadModal from '@/components/CatalogueDownloadModal';

export default function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Image
              src="/images/logo.webp"
              alt="Prakhar Psychological Testing and Research Centre"
              width={1664}
              height={540}
              className="h-10 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-dark-blue-700 transition-colors duration-200 font-medium text-base"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-slate-700 hover:text-dark-blue-700 transition-colors duration-200 font-medium text-base"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-dark-blue-700 transition-colors duration-200 font-medium text-base"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-slate-700 hover:text-dark-blue-700 transition-colors duration-200 font-medium text-base"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-700 hover:text-dark-blue-700 transition-colors duration-200 font-medium text-base"
            >
              Contact
            </Link>
          </div>

          {/* Right side - Catalogue Download, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Catalogue Download Button */}
            <button
              onClick={() => setIsCatalogueModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-dark-blue-700 text-dark-blue-700 rounded-lg font-semibold hover:bg-dark-blue-50 transition-all duration-200 text-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download 2025 Catalogue
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/50 transition-all duration-200"
              aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
            >
              <svg
                className="w-6 h-6 text-dark-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark-blue-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/50 transition-all duration-200 text-dark-blue-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Full Page Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-[100] transition-opacity duration-300"
              onClick={closeMobileMenu}
              style={{ 
                WebkitOverflowScrolling: 'touch',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
            />
            
            {/* Full Page Menu */}
            <div 
              className="md:hidden fixed inset-0 z-[101] flex flex-col items-center justify-center px-6"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeMobileMenu}
                className="absolute top-6 right-6 z-[102] flex items-center justify-center w-12 h-12 rounded-full bg-dark-blue-700 text-white hover:bg-dark-blue-800 transition-all duration-200"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu Items */}
              <div className="flex flex-col items-center space-y-0 w-full max-w-md overflow-y-auto">
                <Link
                  href="/"
                  className="text-dark-blue-900 hover:text-dark-blue-700 transition-colors duration-200 font-bold text-4xl md:text-5xl w-full text-center py-4 border-b border-dark-blue-200"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-dark-blue-900 hover:text-dark-blue-700 transition-colors duration-200 font-bold text-4xl md:text-5xl w-full text-center py-4 border-b border-dark-blue-200"
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-dark-blue-900 hover:text-dark-blue-700 transition-colors duration-200 font-bold text-4xl md:text-5xl w-full text-center py-4 border-b border-dark-blue-200"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="text-dark-blue-900 hover:text-dark-blue-700 transition-colors duration-200 font-bold text-4xl md:text-5xl w-full text-center py-4 border-b border-dark-blue-200"
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-dark-blue-900 hover:text-dark-blue-700 transition-colors duration-200 font-bold text-4xl md:text-5xl w-full text-center py-4 border-b border-dark-blue-200"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>

                {/* Catalogue Download Link */}
                <button
                  onClick={() => {
                    setIsCatalogueModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-dark-blue-700 text-dark-blue-700 rounded-xl font-bold text-xl hover:bg-dark-blue-50 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download 2025 Catalogue
                </button>

                {/* Cart Link */}
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center gap-3 mt-8 mb-4 px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-bold text-2xl hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg"
                  onClick={closeMobileMenu}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                  {itemCount > 0 && (
                    <span className="bg-white text-dark-blue-700 text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Catalogue Download Modal */}
        <CatalogueDownloadModal
          isOpen={isCatalogueModalOpen}
          onClose={() => setIsCatalogueModalOpen(false)}
        />
      </div>
    </nav>
  );
}
