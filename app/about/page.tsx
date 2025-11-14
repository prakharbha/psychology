import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Prakhar Psychological Testing and Research Centre',
  description: 'Learn about Prakhar Psychological Testing and Research Centre - a leading provider of validated psychological assessment tools for professionals, researchers, clinicians, and educational institutions across India.',
  keywords: 'psychological testing, psychological assessment tools, psychological tests India, research centre, clinical psychology, educational psychology, psychological scales, mental health assessment',
  openGraph: {
    title: 'About Us - Prakhar Psychological Testing and Research Centre',
    description: 'Leading provider of validated psychological assessment tools for professionals, researchers, and educational institutions across India.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Us - Prakhar Psychological Testing',
    description: 'Leading provider of validated psychological assessment tools for professionals across India.',
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/images/favicon-48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [
      { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floral animated background */}
      <div className="floral-banner-bg absolute inset-0 pointer-events-none">
        <div className="floral-orb-banner floral-orb-banner-1"></div>
        <div className="floral-orb-banner floral-orb-banner-2"></div>
        <div className="floral-orb-banner floral-orb-banner-3"></div>
        <div className="floral-orb-banner floral-orb-banner-4"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          About Us
        </h1>
        <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
          Empowering professionals with validated psychological assessment tools for research, clinical practice, and education
        </p>

        <div className="space-y-8">
          {/* Introduction */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Prakhar Psychological Testing and Research Centre is a trusted name in the field of psychological assessment 
              and research in India. We specialize in developing, validating, and distributing high-quality psychological 
              tests and assessment tools that meet international standards while being culturally adapted for Indian populations.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our comprehensive collection of psychological instruments serves professionals across diverse sectors including 
              clinical psychology, educational institutions, research organizations, corporate settings, and counseling centers. 
              We are committed to making scientifically rigorous and culturally sensitive assessment tools accessible to practitioners 
              throughout India.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Our mission is to bridge the gap between psychological research and practical application by providing validated, 
              reliable, and culturally appropriate assessment tools. We strive to:
            </p>
            <ul className="space-y-3 text-lg text-slate-700">
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Make high-quality psychological tests accessible to professionals across India</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Ensure all our assessments meet rigorous scientific and psychometric standards</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Provide culturally adapted tools that reflect the diversity of Indian populations</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Support researchers and practitioners in their work through reliable assessment instruments</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Contribute to the advancement of psychological science and practice in India</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              We envision a future where every psychological professional in India has access to world-class assessment tools 
              that are scientifically validated, culturally relevant, and practically applicable. We aim to become the leading 
              resource for psychological testing and assessment in India, recognized for our commitment to quality, innovation, 
              and accessibility.
            </p>
          </div>

          {/* Values */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Scientific Rigor</h3>
                  <p className="text-slate-700">
                    We maintain the highest standards of scientific rigor and psychometric validation in all our assessment tools.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Cultural Sensitivity</h3>
                  <p className="text-slate-700">
                    Our tests are carefully adapted to reflect the cultural, linguistic, and social contexts of Indian populations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Accessibility</h3>
                  <p className="text-slate-700">
                    We believe quality psychological assessment should be accessible to professionals across all sectors and regions.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Innovation</h3>
                  <p className="text-slate-700">
                    We continuously develop and refine our assessment tools based on the latest research and practitioner feedback.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Integrity</h3>
                  <p className="text-slate-700">
                    We operate with transparency, honesty, and ethical practices in all our business operations and relationships.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">Professional Support</h3>
                  <p className="text-slate-700">
                    We provide comprehensive support to help professionals effectively use our assessment tools in their practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              What We Do
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">Psychological Test Development</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We develop and validate psychological assessment tools covering various domains including personality assessment, 
                  mental health evaluation, stress and anxiety measurement, academic performance, and organizational behavior.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">Cultural Adaptation</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Our tests undergo rigorous cultural adaptation processes to ensure they are relevant and valid for Indian 
                  populations. Many of our assessments are available in bilingual (Hindi-English) format, with some exclusively 
                  in Hindi, ensuring wide accessibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">Test Distribution</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We provide easy access to our psychological tests through our online platform, offering both individual test 
                  purchases and bulk orders for institutions. Our tests are available in multiple pack sizes to suit different needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">Research Support</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We support researchers and academic institutions by providing validated assessment tools and contributing to 
                  the advancement of psychological research in India.
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Our Products
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We offer a comprehensive range of psychological tests and assessment tools covering multiple domains:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Personality Assessment</h4>
                <p className="text-slate-700 text-sm">Tests for understanding personality traits, identity styles, and value systems</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Mental Health Evaluation</h4>
                <p className="text-slate-700 text-sm">Scales for assessing depression, anxiety, stress, and overall mental well-being</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Academic Assessment</h4>
                <p className="text-slate-700 text-sm">Tools for evaluating academic performance, study habits, and student well-being</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Organizational Psychology</h4>
                <p className="text-slate-700 text-sm">Instruments for workplace climate, job satisfaction, and organizational behavior</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Life Satisfaction & Well-Being</h4>
                <p className="text-slate-700 text-sm">Scales measuring quality of life, life satisfaction, and personal well-being</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Relationship Assessment</h4>
                <p className="text-slate-700 text-sm">Tools for evaluating marital adjustment, relationship quality, and family dynamics</p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg"
              >
                Explore All Our Tests
              </Link>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Why Choose Prakhar Psychological Testing?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Validated & Reliable</h3>
                    <p className="text-slate-700">All our tests undergo rigorous psychometric validation and reliability testing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Culturally Adapted</h3>
                    <p className="text-slate-700">Tests specifically adapted for Indian cultural and linguistic contexts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Bilingual Options</h3>
                    <p className="text-slate-700">Many tests available in both Hindi and English for wider accessibility</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Comprehensive Range</h3>
                    <p className="text-slate-700">Wide selection covering multiple psychological domains and applications</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Flexible Packaging</h3>
                    <p className="text-slate-700">Tests available in different pack sizes (100 and 500 copies) to suit various needs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-dark-blue-700 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">Professional Support</h3>
                    <p className="text-slate-700">Dedicated support to help you choose and use the right assessment tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
              Our Commitment
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              At Prakhar Psychological Testing and Research Centre, we are committed to maintaining the highest standards of 
              quality and service. We continuously work to:
            </p>
            <ul className="space-y-3 text-lg text-slate-700">
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Ensure all our assessment tools meet international psychometric standards</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Provide accurate, reliable, and culturally appropriate psychological assessments</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Support our customers with prompt service and professional guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Contribute to the advancement of psychological science and practice in India</span>
              </li>
              <li className="flex items-start">
                <span className="text-dark-blue-700 font-bold mr-3 mt-1">•</span>
                <span>Maintain ethical practices in all our business operations</span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-dark-blue-50 to-slate-50">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6 text-center">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-700 text-center mb-8 max-w-2xl mx-auto">
              Have questions about our psychological tests or need assistance choosing the right assessment tool? 
              We're here to help.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dark-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <a href="mailto:prakharpsychology@gmail.com" className="text-dark-blue-700 hover:text-dark-blue-800 transition-colors">
                  prakharpsychology@gmail.com
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dark-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                <a href="tel:+917526008051" className="text-dark-blue-700 hover:text-dark-blue-800 transition-colors">
                  +91 7526008051
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dark-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
                <p className="text-slate-700 text-sm">Orai, Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Explore our comprehensive collection of psychological assessment tools and find the perfect instruments for your needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-dark-blue-800 transition-all duration-300 hover:shadow-lg"
              >
                Browse Our Tests
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 bg-white/80 text-dark-blue-700 rounded-xl font-semibold border border-dark-blue-200 hover:bg-white transition-all duration-300"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
