import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Karma Yoga in Daily Life: A Practical Framework for Inner Peace | Spiritual Psychology',
  description: 'Explore Karma Yoga as a practical psychological framework for finding inner peace through selfless action. Learn how to apply these principles in daily life for greater fulfillment and well-being.',
  keywords: 'karma yoga, selfless action, inner peace, spiritual psychology, mindfulness, purpose, service, yoga philosophy, practical spirituality',
  openGraph: {
    title: 'Karma Yoga in Daily Life: A Practical Framework for Inner Peace',
    description: 'Explore Karma Yoga as a practical framework for finding inner peace through selfless action.',
    type: 'article',
    publishedTime: '2025-02-02T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'Karma Yoga in daily life: a practical framework for inner peace and well-being',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karma Yoga in Daily Life: A Practical Framework for Inner Peace',
    description: 'Explore Karma Yoga as a practical framework for inner peace.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/karma-yoga-daily-life-practical-framework',
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

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Karma Yoga in Daily Life: A Practical Framework for Inner Peace',
    description: 'Explore Karma Yoga as a practical framework for finding inner peace through selfless action.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2025-02-02T00:00:00Z',
    dateModified: '2025-02-02T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Karma Yoga in Daily Life', item: 'https://www.prakharpsychologicaltest.com/blog/karma-yoga-daily-life-practical-framework' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Karma Yoga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Karma Yoga is the path of selfless action—performing duties and actions without attachment to outcomes or personal gain. It emphasizes doing work as an offering, focusing on the action itself rather than rewards, and finding inner peace through dedicated service. From a psychological perspective, it aligns with concepts like flow states, intrinsic motivation, and values-based action.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I practice Karma Yoga in daily life?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice Karma Yoga by: performing your duties with full attention and care, focusing on the process rather than outcomes, serving others without expecting recognition, doing work as an offering rather than for personal gain, maintaining equanimity in success and failure, and finding meaning in service itself. Start with small daily actions performed mindfully and selflessly.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <article className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 text-sm text-slate-600">
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Karma Yoga in Daily Life</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Karma Yoga in Daily Life: A Practical Framework for Inner Peace
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-02-03">February 3, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="Karma Yoga in daily life: a practical framework for inner peace and well-being"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Karma Yoga, the path of selfless action, offers profound psychological insights that extend far beyond 
              spiritual practice. This ancient framework provides a practical approach to finding inner peace, reducing 
              stress, and enhancing well-being through how we approach our daily actions and responsibilities. When 
              understood through a modern psychological lens, Karma Yoga becomes an accessible framework for transforming 
              ordinary activities into sources of meaning and tranquility.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Core Principle: Action Without Attachment
            </h2>
            <p>
              Karma Yoga's fundamental principle is performing actions without attachment to outcomes. This doesn't mean 
              being careless or indifferent—it means giving your best effort while releasing attachment to specific 
              results, recognition, or rewards.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Aspect</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Traditional View</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Psychological Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Focus on Process</td>
                    <td className="border border-slate-300 px-4 py-3">Action itself is the goal</td>
                    <td className="border border-slate-300 px-4 py-3">Reduces anxiety, enables flow states</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Selfless Service</td>
                    <td className="border border-slate-300 px-4 py-3">Work as offering</td>
                    <td className="border border-slate-300 px-4 py-3">Creates meaning and purpose</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Equanimity</td>
                    <td className="border border-slate-300 px-4 py-3">Balance in success and failure</td>
                    <td className="border border-slate-300 px-4 py-3">Emotional stability, resilience</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Mindful Action</td>
                    <td className="border border-slate-300 px-4 py-3">Full attention to present moment</td>
                    <td className="border border-slate-300 px-4 py-3">Reduces stress, enhances performance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Practical Applications in Daily Life
            </h2>
            <p>
              Karma Yoga principles can be applied to any activity—work, relationships, household tasks, or creative 
              pursuits. The key is shifting your relationship to action itself.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What is Karma Yoga?
                </h3>
                <p>
                  Karma Yoga is the path of selfless action—performing duties and actions without attachment to outcomes 
                  or personal gain. It emphasizes doing work as an offering, focusing on the action itself rather than 
                  rewards, and finding inner peace through dedicated service. From a psychological perspective, it aligns 
                  with concepts like flow states, intrinsic motivation, and values-based action.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How can I practice Karma Yoga in daily life?
                </h3>
                <p>
                  Practice Karma Yoga by: performing your duties with full attention and care, focusing on the process 
                  rather than outcomes, serving others without expecting recognition, doing work as an offering rather 
                  than for personal gain, maintaining equanimity in success and failure, and finding meaning in service 
                  itself. Start with small daily actions performed mindfully and selflessly.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Action as Path to Peace
            </h2>
            <p>
              Karma Yoga offers a practical framework for finding inner peace through how we approach daily actions. By 
              performing work selflessly, focusing on process over outcomes, and maintaining equanimity, we transform 
              ordinary activities into sources of meaning, fulfillment, and tranquility. This ancient wisdom, when 
              applied with modern understanding, provides a powerful path to psychological well-being and inner peace.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/blog" className="text-dark-blue-700 hover:text-dark-blue-900 font-semibold">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

