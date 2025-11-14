'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get orderId from various possible parameters
  const orderIdFromParams = searchParams.get('orderId') || 
                            searchParams.get('merchantOrderId') || 
                            searchParams.get('merchantTransactionId') ||
                            searchParams.get('transactionId');
  
  const [orderId, setOrderId] = useState<string | null>(orderIdFromParams);
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    // Try to get orderId from sessionStorage if not in URL
    let finalOrderId = orderIdFromParams;
    
    if (!finalOrderId && typeof window !== 'undefined') {
      const keys = Object.keys(sessionStorage);
      const orderKeys = keys.filter(key => key.startsWith('order_'));
      if (orderKeys.length > 0) {
        const latestKey = orderKeys[orderKeys.length - 1];
        const orderData = JSON.parse(sessionStorage.getItem(latestKey) || '{}');
        if (orderData.orderId) {
          finalOrderId = orderData.orderId;
          setOrderId(finalOrderId);
        }
      }
    }

    if (!finalOrderId) {
      setIsLoading(false);
      setError('Order ID not found');
      return;
    }

    const orderIdToCheck = finalOrderId;

    // Fetch order status from PhonePe
    fetch(`/api/phonepe/status?orderId=${orderIdToCheck}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Status check failed: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!data.success || data.error) {
          setError(data.error || 'Unable to verify order status');
          setIsLoading(false);
          return;
        }

        setOrderStatus(data);
        setIsLoading(false);

        // Send Telegram notification for status update (only once per page load)
        if (data.state && !notificationSent) {
          setNotificationSent(true);
          fetch('/api/telegram/notify-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: orderIdToCheck,
              status: data.state,
              amount: data.amount,
              phonepeOrderId: data.orderId,
            }),
          }).catch(err => {
            console.error('Failed to send status notification:', err);
          });
        }
      })
      .catch(err => {
        console.error('Error checking order status:', err);
        setError('Unable to verify order status');
        setIsLoading(false);
      });
  }, [orderIdFromParams]);

  const getStatusBadge = () => {
    if (!orderStatus) {
      return (
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
          Status: PENDING
        </span>
      );
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return (
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
          Status: COMPLETED
        </span>
      );
    } else if (state === 'PENDING') {
      return (
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
          Status: PENDING
        </span>
      );
    } else if (state === 'FAILED') {
      return (
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-300">
          Status: FAILED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
        Status: PENDING
      </span>
    );
  };

  const getStatusIcon = () => {
    if (!orderStatus) {
      return (
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return (
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    } else if (state === 'FAILED') {
      return (
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
      );
    } else {
      return (
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    }
  };

  const getStatusTitle = () => {
    if (!orderStatus) {
      return 'Order Pending';
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return 'Payment Successful!';
    } else if (state === 'FAILED') {
      return 'Payment Failed';
    } else {
      return 'Payment Pending';
    }
  };

  const getStatusMessage = () => {
    if (!orderStatus) {
      return 'Your order is being processed. We\'ll notify you once payment is confirmed.';
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return 'Thank you for your payment! Your order has been confirmed and will be processed shortly.';
    } else if (state === 'FAILED') {
      return 'We\'re sorry, but your payment could not be processed. Please try again or contact us for assistance.';
    } else {
      return 'Your payment is being processed. We\'ll notify you once it\'s confirmed.';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-blue-600 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Checking Order Status...
            </h2>
            {orderId && (
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Order ID</p>
                <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
              </div>
            )}
            <p className="text-slate-600 mb-8">
              Please wait while we verify your order status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !orderId) {
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
              Order Not Found
            </h2>
            <p className="text-slate-600 mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white/60 text-slate-900 rounded-xl font-semibold border border-white/30 hover:bg-white transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const state = orderStatus?.state?.toUpperCase();
  const isFailed = state === 'FAILED';

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          {getStatusIcon()}
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
            {getStatusTitle()}
          </h2>
          
          {orderId && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Order ID</p>
              <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
            </div>
          )}

          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center gap-2">
              {getStatusBadge()}
            </div>
          </div>

          {error && (
            <div className={`mb-6 p-4 rounded-xl border ${isFailed ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <p className={`text-sm ${isFailed ? 'text-red-800' : 'text-yellow-800'}`}>{error}</p>
            </div>
          )}

          {orderStatus && orderStatus.amount && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Amount</p>
              <p className="text-xl font-bold text-dark-blue-900">
                ₹{(orderStatus.amount / 100).toLocaleString('en-IN')}
              </p>
            </div>
          )}

          <p className="text-slate-600 mb-8">
            {getStatusMessage()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isFailed ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/60 text-slate-900 rounded-xl font-semibold border border-white/30 hover:bg-white transition-all duration-300"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
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
      <OrderStatusContent />
    </Suspense>
  );
}

