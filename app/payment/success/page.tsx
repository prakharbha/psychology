'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending' | 'checking'>('checking');

  useEffect(() => {
    if (orderId) {
      // Check order status from PhonePe
      fetch(`/api/phonepe/status?orderId=${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderStatus(data);
          
          // Check actual payment state
          const state = data.state?.toUpperCase();
          
          // PhonePe payment states: PAYMENT_SUCCESS, PAYMENT_ERROR, PAYMENT_PENDING, etc.
          if (state === 'PAYMENT_SUCCESS' || state === 'SUCCESS') {
            setPaymentStatus('success');
          } else if (state === 'PAYMENT_ERROR' || state === 'FAILED' || state === 'ERROR') {
            setPaymentStatus('failed');
            // Redirect to failure page if payment failed
            router.replace(`/payment/failure?orderId=${orderId}&error=Payment failed`);
            return;
          } else if (state === 'PENDING' || state === 'PAYMENT_PENDING') {
            setPaymentStatus('pending');
          } else {
            // Unknown state, check payment details
            const paymentDetails = data.paymentDetails || [];
            const successfulPayment = paymentDetails.find((p: any) => 
              p.state?.toUpperCase() === 'PAYMENT_SUCCESS' || p.state?.toUpperCase() === 'SUCCESS'
            );
            
            if (successfulPayment) {
              setPaymentStatus('success');
            } else {
              setPaymentStatus('failed');
              router.replace(`/payment/failure?orderId=${orderId}&error=Payment status: ${state || 'Unknown'}`);
              return;
            }
          }
          
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error checking order status:', error);
          setIsLoading(false);
          // On error, assume payment might have failed
          setPaymentStatus('failed');
          router.replace(`/payment/failure?orderId=${orderId}&error=Unable to verify payment status`);
        });
    } else {
      setIsLoading(false);
      setPaymentStatus('failed');
    }
  }, [orderId, router]);

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
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
          {paymentStatus === 'checking' || isLoading ? (
            <>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
                Verifying Payment...
              </h2>
              {orderId && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
                </div>
              )}
              <p className="text-slate-600 mb-8">
                Please wait while we verify your payment status...
              </p>
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
                Payment Successful!
              </h2>
              {orderId && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
                </div>
              )}
              {orderStatus && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-green-800">
                    Payment confirmed. Your order will be processed shortly.
                  </p>
                </div>
              )}
              <p className="text-slate-600 mb-8">
                Thank you for your payment! Your order has been confirmed and will be processed shortly.
              </p>
            </>
          ) : paymentStatus === 'pending' ? (
            <>
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
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
                Payment Pending
              </h2>
              {orderId && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
                </div>
              )}
              <p className="text-slate-600 mb-8">
                Your payment is being processed. We'll notify you once it's confirmed.
              </p>
            </>
          ) : null}
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

export default function PaymentSuccessPage() {
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
      <PaymentSuccessContent />
    </Suspense>
  );
}

