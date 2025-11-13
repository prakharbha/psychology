import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'All Products - Prakhar Psychological Testing',
  description: 'Browse our complete collection of psychological assessment tools and tests',
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="bg-white relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floral animated background */}
      <div className="floral-banner-bg absolute inset-0 pointer-events-none">
        <div className="floral-orb-banner floral-orb-banner-1"></div>
        <div className="floral-orb-banner floral-orb-banner-2"></div>
        <div className="floral-orb-banner floral-orb-banner-3"></div>
        <div className="floral-orb-banner floral-orb-banner-4"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            All Psychological Tests
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive collection of validated psychological assessment tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

