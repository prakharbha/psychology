import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 9);

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Floral animated background */}
        <div className="floral-banner-bg absolute inset-0 pointer-events-none">
          <div className="floral-orb-banner floral-orb-banner-1"></div>
          <div className="floral-orb-banner floral-orb-banner-2"></div>
          <div className="floral-orb-banner floral-orb-banner-3"></div>
          <div className="floral-orb-banner floral-orb-banner-4"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glass-hero rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="subtle-shimmer absolute inset-0 rounded-3xl"></div>
            <div className="relative z-10">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-blue-900 mb-6">
                Premium Psychological<br />Assessment Tools
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Professional-grade psychological tests and inventories for researchers, 
                clinicians, and educational institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg"
                >
                  View All Tests
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white/80 text-dark-blue-700 rounded-xl font-semibold border border-dark-blue-200 hover:bg-white transition-all duration-300"
                  aria-label="Learn more about Prakhar Psychological Testing"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-blue-900 mb-4">
              Our Psychological Tests
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of validated psychological assessment tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-white/80 text-dark-blue-700 rounded-xl font-semibold border border-dark-blue-200 hover:bg-white transition-all duration-300 hover:shadow-lg"
            >
              View All {allProducts.length} Tests
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="subtle-shimmer absolute inset-0 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-blue-900 mb-6">
                About Prakhar Psychological Testing
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We specialize in providing high-quality psychological assessment tools 
                for professionals in research, clinical practice, and education. Our tests 
                are validated, culturally adapted, and available in multiple languages.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
