'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // PhonePe might pass order ID in different ways
  // Also check URL hash and try to get from sessionStorage as fallback
  const orderIdFromParams = searchParams.get('orderId') || 
                            searchParams.get('merchantOrderId') || 
                            searchParams.get('merchantTransactionId') ||
                            searchParams.get('transactionId');
  
  const [orderId, setOrderId] = useState<string | null>(orderIdFromParams);
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending' | 'checking' | 'no_order_id'>('checking');

  useEffect(() => {
    // Check if PhonePe passed any status indicators in the URL
    const statusParam = searchParams.get('status') || searchParams.get('paymentStatus');
    const errorParam = searchParams.get('error') || searchParams.get('errorMessage');
    
    // If PhonePe explicitly indicates failure in URL, redirect immediately
    if (errorParam || (statusParam && (statusParam.toLowerCase() === 'failed' || statusParam.toLowerCase() === 'failure'))) {
      const failureOrderId = orderIdFromParams || searchParams.get('merchantOrderId') || searchParams.get('transactionId');
      router.replace(`/order-status?orderId=${failureOrderId || ''}&error=${encodeURIComponent(errorParam || 'Payment failed')}`);
      return;
    }

    // Try to get orderId from sessionStorage if not in URL
    let finalOrderId = orderIdFromParams;
    
    if (!finalOrderId && typeof window !== 'undefined') {
      // Try to get the most recent order from sessionStorage
      const keys = Object.keys(sessionStorage);
      const orderKeys = keys.filter(key => key.startsWith('order_'));
      if (orderKeys.length > 0) {
        // Get the most recent order (assuming they're ordered by timestamp)
        const latestKey = orderKeys[orderKeys.length - 1];
        const orderData = JSON.parse(sessionStorage.getItem(latestKey) || '{}');
        if (orderData.orderId) {
          finalOrderId = orderData.orderId;
          setOrderId(finalOrderId);
          console.log('Retrieved orderId from sessionStorage:', finalOrderId);
        }
      }
    }

    if (!finalOrderId) {
      // No order ID found - PhonePe might have redirected without it
      // This could mean payment failed or was cancelled
      console.error('No order ID found in redirect URL or sessionStorage');
      setIsLoading(false);
      setPaymentStatus('no_order_id');
      // Redirect to failure page after a short delay
      setTimeout(() => {
        router.replace(`/order-status?error=Payment could not be verified. Please contact support if you made a payment.`);
      }, 2000);
      return;
    }

    const orderIdToCheck = finalOrderId;
    
    // If status param indicates success, we can show success immediately while verifying
    if (statusParam && (statusParam.toLowerCase() === 'success' || statusParam.toLowerCase() === 'successful')) {
      // Still verify via API, but show optimistic success
      console.log('PhonePe redirect indicates success, verifying...');
    }

    // Check order status from PhonePe
    fetch(`/api/phonepe/status?orderId=${orderIdToCheck}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Status check failed: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Check if status check was successful
        if (!data.success || data.error) {
          console.error('Failed to get order status:', data.error);
          // Don't immediately redirect to failure - might be a temporary API issue
          // Show pending state and let user know we're checking
          setPaymentStatus('pending');
          setIsLoading(false);
          // Try again after a delay
          setTimeout(() => {
            fetch(`/api/phonepe/status?orderId=${orderIdToCheck}`)
              .then(res => res.json())
              .then(retryData => {
                if (retryData.success && retryData.state) {
                  const retryState = retryData.state?.toUpperCase();
                  if (retryState === 'COMPLETED') {
                    setPaymentStatus('success');
                    setOrderStatus(retryData);
                  } else if (retryState === 'FAILED') {
                    setPaymentStatus('failed');
                    router.replace(`/order-status?orderId=${orderIdToCheck}&error=Payment failed`);
                  } else if (retryState === 'PENDING') {
                    setPaymentStatus('pending');
                  }
                } else {
                  // Still can't verify - redirect to failure
                  setPaymentStatus('failed');
                  router.replace(`/order-status?orderId=${orderIdToCheck}&error=${encodeURIComponent(data.error || 'Unable to verify payment status')}`);
                }
              })
              .catch(() => {
                setPaymentStatus('failed');
                router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Unable to verify payment status`);
              });
          }, 3000);
          return;
        }

        setOrderStatus(data);
        
        // Check actual payment state
        // PhonePe order states: PENDING, FAILED, COMPLETED
        // Payment details states: PENDING, COMPLETED, FAILED
        const state = data.state?.toUpperCase();
        
        if (state === 'COMPLETED') {
          setPaymentStatus('success');
        } else if (state === 'FAILED') {
          setPaymentStatus('failed');
          // Redirect to failure page if payment failed
          router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Payment failed`);
          return;
        } else if (state === 'PENDING') {
          setPaymentStatus('pending');
        } else {
          // Unknown state, check payment details
          const paymentDetails = data.paymentDetails || [];
          // Check if any payment attempt was completed
          const completedPayment = paymentDetails.find((p: any) => 
            p.state?.toUpperCase() === 'COMPLETED'
          );
          
          if (completedPayment) {
            setPaymentStatus('success');
          } else if (paymentDetails.length > 0) {
            // Has payment details but no completed payment - check if any failed
            const failedPayment = paymentDetails.find((p: any) => 
              p.state?.toUpperCase() === 'FAILED'
            );
            if (failedPayment) {
              setPaymentStatus('failed');
              router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Payment failed`);
              return;
            } else {
              // Still pending
              setPaymentStatus('pending');
            }
          } else {
            // No payment details - might be pending or failed
            // Don't immediately fail - show pending and check again
            setPaymentStatus('pending');
            setIsLoading(false);
            // Retry status check after delay
            setTimeout(() => {
              fetch(`/api/phonepe/status?orderId=${orderIdToCheck}`)
                .then(res => res.json())
                .then(retryData => {
                  if (retryData.success) {
                    const retryState = retryData.state?.toUpperCase();
                    if (retryState === 'COMPLETED') {
                      setPaymentStatus('success');
                      setOrderStatus(retryData);
                    } else if (retryState === 'FAILED') {
                      setPaymentStatus('failed');
                      router.replace(`/order-status?orderId=${orderIdToCheck}&error=Payment failed`);
                    } else if (retryState === 'PENDING') {
                      setPaymentStatus('pending');
                    } else {
                      setPaymentStatus('failed');
                      router.replace(`/order-status?orderId=${orderIdToCheck}&error=Payment could not be completed`);
                    }
                  }
                })
                .catch(() => {
                  setPaymentStatus('failed');
                  router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Payment could not be completed`);
                });
            }, 3000);
            return;
          }
        }
        
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error checking order status:', error);
        setIsLoading(false);
        // On error, show pending and try again
        setPaymentStatus('pending');
        // Retry after delay
        setTimeout(() => {
          fetch(`/api/phonepe/status?orderId=${orderIdToCheck}`)
            .then(res => res.json())
            .then(retryData => {
              if (retryData.success && retryData.state) {
                const retryState = retryData.state?.toUpperCase();
                if (retryState === 'COMPLETED') {
                  setPaymentStatus('success');
                  setOrderStatus(retryData);
                } else if (retryState === 'FAILED') {
                  setPaymentStatus('failed');
                  router.replace(`/order-status?orderId=${orderIdToCheck}&error=Payment failed`);
                } else if (retryState === 'PENDING') {
                  setPaymentStatus('pending');
                } else {
                  setPaymentStatus('failed');
                  router.replace(`/order-status?orderId=${orderIdToCheck}&error=Unable to verify payment status`);
                }
              } else {
                setPaymentStatus('failed');
                router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Unable to verify payment status`);
              }
            })
            .catch(() => {
              setPaymentStatus('failed');
              router.replace(`/payment/failure?orderId=${orderIdToCheck}&error=Unable to verify payment status`);
            });
        }, 3000);
      });
  }, [orderIdFromParams, router]);

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          {paymentStatus === 'checking' || isLoading ? (
            <>
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
                <>
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
                        Status: COMPLETED
                      </span>
                    </div>
                    <p className="text-sm text-green-800">
                      Payment confirmed. Your order will be processed shortly.
                    </p>
                  </div>
                </>
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
              <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
                    Status: PENDING
                  </span>
                </div>
                <p className="text-sm text-yellow-800">
                  Your payment is being processed. We'll notify you once it's confirmed.
                </p>
              </div>
              <p className="text-slate-600 mb-8">
                Please wait while we verify your payment status.
              </p>
            </>
          ) : paymentStatus === 'no_order_id' ? (
            <>
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
                Payment Verification Failed
              </h2>
              <p className="text-slate-600 mb-8">
                We couldn't verify your payment. Redirecting to support...
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

