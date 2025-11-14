import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: post.focusKeywords?.join(', ') || post.tags.join(', '),
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
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
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // This will be replaced with actual content from the blog post file
  return (
    <article className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {post.title}
        </h1>
        <div className="text-slate-600 mb-8">
          <p>By {post.author} • {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-slate-700 mb-8">{post.excerpt}</p>
          {/* Blog content will be rendered here */}
        </div>
      </div>
    </article>
  );
}

