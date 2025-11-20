import Link from 'next/link';
import Image from 'next/image';
import CatalogueDownloadButton from '@/components/CatalogueDownloadButton';

export default function Footer() {
  return (
    <footer className="glass-card border-t border-white/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.webp"
                alt="Prakhar Psychological Testing and Research Centre"
                width={1664}
                height={540}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>
            <p className="text-slate-800 text-sm mb-4">
              Premium psychological assessment tools and tests for professionals.
            </p>
            
            {/* Contact Info */}
            <div className="mb-4">
              <h4 className="font-semibold text-dark-blue-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-800">
                <li>Email: prakharpsychology@gmail.com</li>
                <li>Phone: +91 7526008051</li>
              </ul>
            </div>
            
            {/* Follow Us */}
            <div>
              <h4 className="font-semibold text-dark-blue-900 mb-3">Follow Us</h4>
              <a
                href="https://www.facebook.com/psychologicalresearchcenter/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-800 hover:text-dark-blue-700 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-dark-blue-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h5 className="font-semibold text-dark-blue-900 mb-4">Policies</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-800 hover:text-dark-blue-700 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Catalog Download Section */}
        <div className="mt-8 pt-8 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-slate-800">
              All rights reserved © Prakhar Psychological Testing and Research Centre
            </p>
            <p className="text-sm text-slate-600">
              Website by{' '}
              <a
                href="https://www.nandann.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-blue-700 hover:text-dark-blue-800 transition-colors font-medium"
              >
                Nandann Creative Agency
              </a>
            </p>
          </div>
          <CatalogueDownloadButton />
        </div>
      </div>
    </footer>
  );
}

