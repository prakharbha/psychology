import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Prakhar Psychological Testing',
  description: 'Articles and insights about psychological testing and assessment',
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

export default function BlogPage() {
  return (
    <div className="bg-white relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floral animated background */}
      <div className="floral-banner-bg absolute inset-0 pointer-events-none">
        <div className="floral-orb-banner floral-orb-banner-1"></div>
        <div className="floral-orb-banner floral-orb-banner-2"></div>
        <div className="floral-orb-banner floral-orb-banner-3"></div>
        <div className="floral-orb-banner floral-orb-banner-4"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
          Blog
        </h1>

        <div className="glass-card rounded-3xl p-12 text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-lg text-slate-600">
            We're working on bringing you insightful articles about psychological testing, 
            assessment tools, and research findings. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}

