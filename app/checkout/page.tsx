'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/products';
import { useRouter } from 'next/navigation';
import { sendTelegramNotification, generateOrderId, type OrderNotificationData } from '@/lib/notifications';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8">
              Please add items to your cart before checkout.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotificationError(null);

    try {
      // Generate order ID
      const orderId = generateOrderId();

      // Use environment variables if available, otherwise construct from current origin
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      // These will be used as fallback if env vars are not set
      const redirectUrl = `${baseUrl}/order-confirmation?orderId=${orderId}`;
      const failureUrl = `${baseUrl}/order-confirmation?orderId=${orderId}`;

      // Initiate PhonePe payment
      const paymentResponse = await fetch('/api/phonepe/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total,
          customerPhone: formData.phone,
          redirectUrl: redirectUrl,
          failureUrl: failureUrl,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok || !paymentData.success) {
        throw new Error(paymentData.error || 'Failed to initiate payment');
      }

      // Save order details temporarily (you might want to save to database)
      // For now, we'll save order info in sessionStorage
      if (typeof window !== 'undefined') {
        const orderData = {
          orderId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          items: items.map((item) => ({
            productName: item.productName,
            packSize: item.packSize,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
          paymentMethod: 'PhonePe',
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
        };
        sessionStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      }

      // Order notification will be sent after payment status is confirmed via webhook
      
      // Clear abandoned cart timer since user has initiated checkout
      // The cart will be cleared after successful payment
      if (typeof window !== 'undefined') {
        // Mark that checkout has been initiated (prevents abandoned cart notification)
        localStorage.setItem('checkout_initiated', 'true');
      }

      // Redirect to PhonePe checkout
      if (paymentData.checkoutUrl) {
        window.location.href = paymentData.checkoutUrl;
        return;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (error) {
      console.error('Order processing error:', error);
      setNotificationError('There was an error processing your order. Please try again or contact us.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8 mb-6">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
                Shipping Information
              </h2>

              {notificationError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
                  {notificationError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      pattern="[0-9]{6}"
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="Enter 6-digit pincode"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                      placeholder="State"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-dark-blue-700 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.packSize}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-slate-900">{item.productName}</p>
                      <p className="text-slate-600">Pack of {item.packSize} × {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/30 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/30">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
