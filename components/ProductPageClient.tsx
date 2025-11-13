'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { Product, getProductVariant, formatPrice } from '@/lib/products';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedPackSize, setSelectedPackSize] = useState<100 | 500>(100);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const variant = getProductVariant(product, selectedPackSize);
  const price = variant.price;
  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      packSize: selectedPackSize,
      price: price,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const pack100Variant = getProductVariant(product, 100);
  const pack500Variant = getProductVariant(product, 500);

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Select Pack Size</h2>

      {/* Pack Size Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelectedPackSize(100)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedPackSize === 100
              ? 'border-slate-900 bg-dark-blue-700 text-white'
              : 'border-white/30 bg-white/60 text-slate-900 hover:border-slate-400'
          }`}
        >
          <div className="text-center">
            <p className="font-bold text-xl mb-1">Pack of 100</p>
            <p className="text-lg">{formatPrice(pack100Variant.price)}</p>
          </div>
        </button>
        <button
          onClick={() => setSelectedPackSize(500)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedPackSize === 500
              ? 'border-slate-900 bg-dark-blue-700 text-white'
              : 'border-white/30 bg-white/60 text-slate-900 hover:border-slate-400'
          }`}
        >
          <div className="text-center">
            <p className="font-bold text-xl mb-1">Pack of 500</p>
            <p className="text-lg">{formatPrice(pack500Variant.price)}</p>
          </div>
        </button>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-white/30 bg-white/60 hover:bg-white transition-colors flex items-center justify-center font-bold text-slate-900"
          >
            −
          </button>
          <span className="text-lg font-semibold text-slate-900 w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-white/30 bg-white/60 hover:bg-white transition-colors flex items-center justify-center font-bold text-slate-900"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="mb-6 p-4 bg-white/60 rounded-xl border border-white/30">
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-semibold">Total:</span>
          <span className="text-2xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          addedToCart
            ? 'bg-green-600 text-white'
            : 'bg-dark-blue-700 text-white hover:bg-slate-800 hover:shadow-lg'
        }`}
      >
        {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
      </button>

      {/* Go to Cart Button - Shows after adding to cart */}
      {addedToCart && (
        <Link
          href="/cart"
          className="w-full mt-4 py-4 bg-white border-2 border-dark-blue-700 text-dark-blue-700 rounded-xl font-semibold text-lg hover:bg-dark-blue-50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Go to Cart
        </Link>
      )}
    </div>
  );
}

