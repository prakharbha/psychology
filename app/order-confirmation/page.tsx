'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 
                  searchParams.get('merchantOrderId') || 
                  searchParams.get('merchantTransactionId') ||
                  searchParams.get('transactionId');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const notificationSentRef = useRef(false); // To prevent duplicate notifications

  useEffect(() => {
    // Try to get orderId from sessionStorage if not in URL
    let finalOrderId = orderId;
    
    if (!finalOrderId && typeof window !== 'undefined') {
      const keys = Object.keys(sessionStorage);
      const orderKeys = keys.filter(key => key.startsWith('order_'));
      if (orderKeys.length > 0) {
        const latestKey = orderKeys[orderKeys.length - 1];
        const orderData = JSON.parse(sessionStorage.getItem(latestKey) || '{}');
        if (orderData.orderId) {
          finalOrderId = orderData.orderId;
        }
      }
    }

    if (finalOrderId) {
      setIsLoadingStatus(true);
      
      // Get order details from sessionStorage
      let orderDetails = null;
      if (typeof window !== 'undefined') {
        const orderDataStr = sessionStorage.getItem(`order_${finalOrderId}`);
        if (orderDataStr) {
          try {
            orderDetails = JSON.parse(orderDataStr);
          } catch (e) {
            console.error('Failed to parse order details:', e);
          }
        }
      }
      
      fetch(`/api/phonepe/status?orderId=${finalOrderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrderStatus(data);
            
            // Send Telegram notification for all statuses (only once per page load)
            const state = data.state?.toUpperCase();
            if (state && !notificationSentRef.current) {
              notificationSentRef.current = true;
              
              // Include customer details and order items in notification
              const notificationData: any = {
                orderId: finalOrderId,
                status: state,
                amount: data.amount,
                phonepeOrderId: data.orderId,
              };
              
              // Add customer details if available
              if (orderDetails) {
                notificationData.customerName = orderDetails.customerName;
                notificationData.customerEmail = orderDetails.customerEmail;
                notificationData.customerPhone = orderDetails.customerPhone;
                notificationData.shippingAddress = orderDetails.shippingAddress;
                notificationData.items = orderDetails.items;
              }
              
              // Send Telegram notification (keep existing)
              fetch('/api/telegram/notify-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notificationData),
              }).catch(err => {
                console.error('Failed to send status notification:', err);
              });

              // Send email notifications (customer + admin) if order details available
              if (orderDetails && (state === 'COMPLETED' || state === 'FAILED')) {
                fetch('/api/email/send-order-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderId: finalOrderId,
                    customerName: orderDetails.customerName,
                    customerEmail: orderDetails.customerEmail,
                    customerPhone: orderDetails.customerPhone,
                    items: orderDetails.items,
                    total: orderDetails.total,
                    status: state,
                    shippingAddress: orderDetails.shippingAddress,
                    phonepeOrderId: data.orderId,
                  }),
                }).catch(err => {
                  console.error('Failed to send order email:', err);
                });
              }
            }

            // Clear cart and abandoned cart flags on successful payment
            if (state === 'COMPLETED' && typeof window !== 'undefined') {
              localStorage.removeItem('cart');
              localStorage.removeItem('checkout_initiated');
            }
          }
          setIsLoadingStatus(false);
        })
        .catch(() => {
          setIsLoadingStatus(false);
        });
    } else {
      setIsLoadingStatus(false);
    }
  }, [orderId]);

  const getStatusBadge = () => {
    if (!orderStatus) {
      // Default to pending if no status available
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
          Status: PENDING
        </span>
      );
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
          Status: COMPLETED
        </span>
      );
    } else if (state === 'PENDING') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
          Status: PENDING
        </span>
      );
    } else if (state === 'FAILED') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-300">
          Status: FAILED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
        Status: PENDING
      </span>
    );
  };

  const getStatusIcon = () => {
    if (isLoadingStatus) {
      return (
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      );
    }
    
    if (!orderStatus) {
      return (
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') {
      return (
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else if (state === 'FAILED') {
      return (
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    } else if (state === 'PENDING') {
      return (
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    return null;
  };

  const getTitle = () => {
    if (isLoadingStatus) return 'Verifying Order...';
    if (!orderStatus) return 'Order Confirmed!';
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') return 'Order Confirmed!';
    if (state === 'FAILED') return 'Order Failed';
    if (state === 'PENDING') return 'Order Pending';
    return 'Order Confirmed!';
  };

  const getMessage = () => {
    if (isLoadingStatus) return 'Please wait while we verify your order status...';
    if (!orderStatus) return 'Thank you for your order! Our sales representative will be getting in touch with you shortly for payment through UPI QR code or Bank Transfer. We\'ll process your order once the payment is confirmed.';
    const state = orderStatus.state?.toUpperCase();
    if (state === 'COMPLETED') return 'Thank you for your order! Your payment has been confirmed and your order will be processed shortly.';
    if (state === 'FAILED') return 'We\'re sorry, but your order could not be processed. Please try again or contact us for assistance.';
    if (state === 'PENDING') return 'Thank you for your order! Your payment is being processed. We\'ll notify you once it\'s confirmed.';
    return 'Thank you for your order! Our sales representative will be getting in touch with you shortly for payment through UPI QR code or Bank Transfer. We\'ll process your order once the payment is confirmed.';
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          {getStatusIcon()}
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
            {getTitle()}
          </h2>
          {orderId && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Order ID</p>
              <p className="text-xl font-bold text-dark-blue-900">{orderId}</p>
            </div>
          )}
          {orderStatus && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getStatusBadge()}
              </div>
              {orderStatus.amount && (
                <p className="text-sm text-slate-600 mt-2">
                  Amount: <span className="font-semibold">₹{(orderStatus.amount / 100).toLocaleString('en-IN')}</span>
                </p>
              )}
            </div>
          )}
          <p className="text-slate-600 mb-8">
            {getMessage()}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(orderStatus?.state?.toUpperCase() === 'FAILED') && (
              <Link
                href="/cart"
                className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
              >
                Go to Cart
              </Link>
            )}
            {(orderStatus?.state?.toUpperCase() === 'COMPLETED' || orderStatus?.state?.toUpperCase() === 'PENDING' || !orderStatus) && (
              <Link
                href="/products"
                className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            )}
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

export default function OrderConfirmationPage() {
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
      <OrderConfirmationContent />
    </Suspense>
  );
}

