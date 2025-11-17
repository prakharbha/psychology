import Link from 'next/link';
import Image from 'next/image';
import { Product, getProductVariant, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use first image from images array if available, otherwise fall back to image property
  const imagePath = 
    (product.images && product.images.length > 0) 
      ? product.images[0] 
      : product.image || '/images/placeholder-test.svg';
  const pack100Variant = getProductVariant(product, 100);
  const minPrice = pack100Variant.price;

  return (
    <Link href={`/${product.slug}`}>
      <div className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
          <Image
            src={imagePath}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
            {product.description}
          </p>

          {/* Product Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 bg-white/60 rounded-full text-slate-700 border border-white/30">
              {product.ageRange} years
            </span>
            <span className="text-xs px-3 py-1 bg-white/60 rounded-full text-slate-700 border border-white/30">
              {product.language}
            </span>
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/30">
            <span className="text-slate-900 font-semibold">
              From {formatPrice(minPrice)}
            </span>
            <span className="text-slate-600 text-sm">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

