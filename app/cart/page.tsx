'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
            <svg
              className="w-24 h-24 mx-auto mb-6 text-slate-400"
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
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8">
              Start adding products to your cart to continue shopping.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.packSize}`} className="glass-card rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/${item.productSlug}`}>
                      <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 hover:text-dark-blue-700 transition-colors cursor-pointer">
                        {item.productName}
                      </h3>
                    </Link>
                    <p className="text-slate-600 mb-2">
                      Pack of {item.packSize}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.packSize, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg border border-white/30 bg-white/60 hover:bg-white transition-colors flex items-center justify-center font-bold text-slate-900"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-slate-900 w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.packSize, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-white/30 bg-white/60 hover:bg-white transition-colors flex items-center justify-center font-bold text-slate-900"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-bold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId, item.packSize)}
                      className="text-red-600 hover:text-red-700 transition-colors p-2"
                      aria-label="Remove item"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-white/30 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 bg-dark-blue-700 text-white rounded-xl font-semibold text-center hover:bg-slate-800 transition-all duration-300 hover:shadow-lg mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full py-4 bg-white/60 text-slate-900 rounded-xl font-semibold text-center border border-white/30 hover:bg-white transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

