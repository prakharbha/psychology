import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Psychological Insights & Research | Prakhar Psychological Testing',
  description: 'Explore expert articles on psychological testing, mental health, personal development, and research insights from Prakhar Psychological Testing.',
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
  const posts = getAllBlogPosts();

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
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
          Blog
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 block"
              >
                {post.image && (
                  <div className="w-full h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-dark-blue-100 text-dark-blue-800 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.author}</span>
                    <time dateTime={post.publishedDate}>
                      {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-slate-600">
              We're working on bringing you insightful articles about psychological testing, 
              assessment tools, and research findings. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

