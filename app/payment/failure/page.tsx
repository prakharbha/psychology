'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-600"
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
          </div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
            Payment Failed
          </h2>
          {orderId && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Order ID</p>
              <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <p className="text-slate-600 mb-8">
            We're sorry, but your payment could not be processed. Please try again or contact us for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/60 text-slate-900 rounded-xl font-semibold border border-white/30 hover:bg-white transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}

