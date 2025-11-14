import Link from 'next/link';
import Image from 'next/image';

export default function BannerTestPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-900">
          Banner Design Options
        </h1>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          Scroll through different banner designs. Replace the Pexels image URLs with your own images.
        </p>

        {/* Option 1: Full-Width Image Background with Overlay */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 1: Full-Width Image Background</h2>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Psychology background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-blue-900/80 via-dark-blue-800/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                    Professional-grade psychological tests and inventories for researchers, 
                    clinicians, and educational institutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center"
                    >
                      View All Tests
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-4 bg-dark-blue-700/80 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30 hover:bg-dark-blue-800 transition-all duration-300 text-center"
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 2: Split Layout - Image Left, Content Right */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 2: Split Layout</h2>
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-[500px] lg:h-auto">
              <Image
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Psychology background"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-gradient-to-br from-dark-blue-900 to-dark-blue-700 p-12 md:p-16 flex items-center">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 3: Centered Content with Background Image */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 3: Centered with Background</h2>
          <div className="relative h-[650px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Psychology background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-dark-blue-900/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 4: Gradient Background with Pattern */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 4: Gradient with Pattern</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-blue-900 via-dark-blue-800 to-dark-blue-700"></div>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            <div className="relative py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 5: Image with Glass Card Overlay */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 5: Image with Glass Card</h2>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Psychology background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="glass-card rounded-3xl p-12 md:p-16 max-w-3xl w-full text-center relative overflow-hidden">
                <div className="subtle-shimmer absolute inset-0 rounded-3xl"></div>
                <div className="relative z-10">
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-blue-900 mb-6">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
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
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 6: Modern with Shapes */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 6: Modern with Shapes</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-dark-blue-900 to-dark-blue-700">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40"></div>
            <div className="relative py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                      Premium Psychological<br />Assessment Tools
                    </h1>
                    <p className="text-lg text-white/90 mb-8 leading-relaxed">
                      Professional-grade psychological tests and inventories for researchers, 
                      clinicians, and educational institutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/products"
                        className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center"
                      >
                        View All Tests
                      </Link>
                      <Link
                        href="/about"
                        className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Psychology"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 7: Minimal Clean Design */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 7: Minimal Clean</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-slate-200">
            <div className="py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block mb-6">
                  <span className="px-4 py-2 bg-dark-blue-100 text-dark-blue-700 rounded-full text-sm font-semibold">
                    Professional Assessment Tools
                  </span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-blue-900 mb-6">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
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
                    className="px-8 py-4 bg-slate-100 text-dark-blue-700 rounded-xl font-semibold border border-slate-300 hover:bg-slate-200 transition-all duration-300"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 8: Asymmetric Layout */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 8: Asymmetric Layout</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 relative h-[500px] lg:h-auto bg-gradient-to-br from-dark-blue-900 to-dark-blue-700 p-12 md:p-16 flex items-center">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Professional-grade psychological tests and inventories for researchers, 
                    clinicians, and educational institutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center"
                    >
                      View All Tests
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 relative h-[500px] lg:h-auto">
                <Image
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Psychology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="text-center py-12">
          <Link
            href="/"
            className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

