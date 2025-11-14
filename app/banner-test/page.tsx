'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BannerTestPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-900 animate-fade-in">
          Banner Design Options with Animations
        </h1>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto animate-fade-in animate-delay-200">
          Scroll through different banner designs with modern animations inspired by popular UI libraries.
        </p>

        {/* Option 1: Full-Width Image Background with Fade In Up */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 1: Fade In Up Animation</h2>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg"
              alt="Psychology background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-blue-900/80 via-dark-blue-800/70 to-transparent animate-gradient"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={`max-w-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-shimmer-text">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed ${isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
                    Professional-grade psychological tests and inventories for researchers, 
                    clinicians, and educational institutions.
                  </p>
                  <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center animate-scale-in"
                    >
                      View All Tests
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-4 bg-dark-blue-700/80 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30 hover:bg-dark-blue-800 transition-all duration-300 text-center animate-scale-in animate-delay-100"
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Particles */}
            <div className="particle w-4 h-4 top-20 left-20" style={{ animationDelay: '0s' }}></div>
            <div className="particle w-6 h-6 top-40 right-32" style={{ animationDelay: '2s' }}></div>
            <div className="particle w-3 h-3 bottom-32 left-1/3" style={{ animationDelay: '4s' }}></div>
          </div>
        </section>

        {/* Option 2: Split Layout with Slide In */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 2: Slide In Animation</h2>
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-[500px] lg:h-auto animate-fade-in-left">
              <Image
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg"
                alt="Psychology background"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-gradient-to-br from-dark-blue-900 to-dark-blue-700 p-12 md:p-16 flex items-center animate-fade-in-right">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-text-reveal">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed animate-fade-in animate-delay-200">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center animate-bounce-in"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center animate-bounce-in animate-delay-100"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 3: Centered with Glow Effect */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 3: Glow & Scale Animation</h2>
          <div className="relative h-[650px] rounded-3xl overflow-hidden shadow-2xl animate-glow">
            <Image
              src="/images/blog/prakhar-psychological-testing-young-adults-success.jpg"
              alt="Psychology background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-dark-blue-900/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4 animate-scale-in">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-shimmer-text">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg animate-pulse-glow"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300 animate-pulse-glow"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 4: Gradient Animation */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 4: Animated Gradient</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-blue-900 via-dark-blue-800 to-dark-blue-700 animate-gradient"></div>
            <div className="absolute inset-0 opacity-10 animate-rotate-gradient" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            <div className="relative py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-shimmer-text">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg animate-bounce-in"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300 animate-bounce-in animate-delay-100"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 5: Glass Card with Particles */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 5: Glass Card with Floating Particles</h2>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/blog/prakhar-psychological-testing-young-adults-success.jpg"
              alt="Psychology background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="glass-card rounded-3xl p-12 md:p-16 max-w-3xl w-full text-center relative overflow-hidden animate-scale-in">
                <div className="subtle-shimmer absolute inset-0 rounded-3xl"></div>
                {/* Floating Particles */}
                <div className="particle w-3 h-3 top-10 left-10" style={{ animationDelay: '0s' }}></div>
                <div className="particle w-5 h-5 top-20 right-20" style={{ animationDelay: '1s' }}></div>
                <div className="particle w-4 h-4 bottom-20 left-20" style={{ animationDelay: '2s' }}></div>
                <div className="particle w-3 h-3 bottom-10 right-10" style={{ animationDelay: '3s' }}></div>
                <div className="relative z-10">
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-blue-900 mb-6 animate-fade-in-up">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
                    Professional-grade psychological tests and inventories for researchers, 
                    clinicians, and educational institutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg animate-bounce-in"
                    >
                      View All Tests
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-4 bg-white/80 text-dark-blue-700 rounded-xl font-semibold border border-dark-blue-200 hover:bg-white transition-all duration-300 animate-bounce-in animate-delay-100"
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 6: Modern with Animated Shapes */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 6: Animated Shapes & Bounce</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-dark-blue-900 to-dark-blue-700 animate-gradient">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 animate-pulse-glow"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <div className="relative py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in-left">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-shimmer-text">
                      Premium Psychological<br />Assessment Tools
                    </h1>
                    <p className="text-lg text-white/90 mb-8 leading-relaxed animate-fade-in animate-delay-200">
                      Professional-grade psychological tests and inventories for researchers, 
                      clinicians, and educational institutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
                      <Link
                        href="/products"
                        className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center animate-bounce-in"
                      >
                        View All Tests
                      </Link>
                      <Link
                        href="/about"
                        className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center animate-bounce-in animate-delay-100"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden animate-fade-in-right animate-scale-in">
                    <Image
                      src="/images/blog/prakhar-psychological-testing-workplace-climate.jpg"
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

        {/* Option 7: Minimal with Text Reveal */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 7: Text Reveal Animation</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-slate-200 animate-fade-in">
            <div className="py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block mb-6 animate-fade-in-down">
                  <span className="px-4 py-2 bg-dark-blue-100 text-dark-blue-700 rounded-full text-sm font-semibold">
                    Professional Assessment Tools
                  </span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-blue-900 mb-6 animate-text-reveal">
                  Premium Psychological<br />Assessment Tools
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
                  Professional-grade psychological tests and inventories for researchers, 
                  clinicians, and educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg animate-scale-in"
                  >
                    View All Tests
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-slate-100 text-dark-blue-700 rounded-xl font-semibold border border-slate-300 hover:bg-slate-200 transition-all duration-300 animate-scale-in animate-delay-100"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 8: Asymmetric with Staggered Animation */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Option 8: Staggered Fade In</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 relative h-[500px] lg:h-auto bg-gradient-to-br from-dark-blue-900 to-dark-blue-700 p-12 md:p-16 flex items-center animate-fade-in-left animate-gradient">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                    Premium Psychological<br />Assessment Tools
                  </h1>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
                    Professional-grade psychological tests and inventories for researchers, 
                    clinicians, and educational institutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-white text-dark-blue-700 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:shadow-lg text-center animate-bounce-in"
                    >
                      View All Tests
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white/50 hover:bg-white/10 transition-all duration-300 text-center animate-bounce-in animate-delay-100"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 relative h-[500px] lg:h-auto animate-fade-in-right animate-scale-in">
                <Image
                  src="/images/blog/prakhar-psychological-testing-achievement-motivation.jpg"
                  alt="Psychology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="text-center py-12 animate-fade-in">
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
