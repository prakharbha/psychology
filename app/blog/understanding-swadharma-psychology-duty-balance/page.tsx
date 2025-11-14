import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Understanding Swadharma: The Psychology of Duty & Balance | Ancient Wisdom for Modern Life',
  description: 'Explore Swadharma from a psychological perspective: understanding your true nature, aligning actions with inner values, and finding balance between duty and personal fulfillment.',
  keywords: 'swadharma, dharma, duty psychology, personal values, life purpose, authentic living, psychological balance, Indian philosophy, self-realization',
  openGraph: {
    title: 'Understanding Swadharma: The Psychology of Duty & Balance',
    description: 'Explore Swadharma from a psychological perspective and find balance between duty and personal fulfillment.',
    type: 'article',
    publishedTime: '2025-01-22T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'Understanding Swadharma: the psychology of duty and balance in daily life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understanding Swadharma: The Psychology of Duty & Balance',
    description: 'Explore Swadharma from a psychological perspective.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/understanding-swadharma-psychology-duty-balance',
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
    headline: 'Understanding Swadharma: The Psychology of Duty & Balance',
    description: 'Explore Swadharma from a psychological perspective and find balance between duty and personal fulfillment.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2025-01-22T00:00:00Z',
    dateModified: '2025-01-22T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Understanding Swadharma', item: 'https://www.prakharpsychologicaltest.com/blog/understanding-swadharma-psychology-duty-balance' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Swadharma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Swadharma refers to one\'s own duty or true nature—the path that aligns with your inherent qualities, values, and life circumstances. It emphasizes acting according to your authentic self rather than following external expectations or imitating others.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Swadharma relate to modern psychology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Swadharma aligns with psychological concepts like authentic living, values-based action, self-determination theory, and identity integration. It emphasizes the importance of aligning behavior with internal values rather than external pressures, which research shows leads to greater well-being and life satisfaction.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Understanding Swadharma</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Understanding Swadharma: The Psychology of Duty & Balance
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-22">January 22, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="Understanding Swadharma: the psychology of duty and balance in daily life"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Swadharma, a concept from ancient Indian philosophy, translates to "one's own duty" or "one's true nature." 
              While rooted in spiritual tradition, this principle offers profound psychological insights that resonate 
              with modern understanding of authentic living, values alignment, and personal fulfillment. Exploring 
              Swadharma through a psychological lens reveals timeless wisdom about how to balance duty, personal 
              fulfillment, and authentic self-expression.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Core Concept: Your Own Path
            </h2>
            <p>
              Swadharma emphasizes that each person has a unique path aligned with their inherent nature, circumstances, 
              and stage of life. It's not about following someone else's definition of success or duty—it's about 
              discovering and honoring your authentic way of being in the world.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Aspect</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Swadharma Approach</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Psychological Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Self-Knowledge</td>
                    <td className="border border-slate-300 px-4 py-3">Understanding your true nature</td>
                    <td className="border border-slate-300 px-4 py-3">Identity clarity, reduced inner conflict</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Values Alignment</td>
                    <td className="border border-slate-300 px-4 py-3">Actions match internal values</td>
                    <td className="border border-slate-300 px-4 py-3">Authenticity, integrity, well-being</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Context Awareness</td>
                    <td className="border border-slate-300 px-4 py-3">Duty based on circumstances</td>
                    <td className="border border-slate-300 px-4 py-3">Realistic expectations, adaptability</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Balance</td>
                    <td className="border border-slate-300 px-4 py-3">Harmony between duty and fulfillment</td>
                    <td className="border border-slate-300 px-4 py-3">Sustainable engagement, reduced burnout</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Psychological Foundations
            </h2>
            <p>
              Modern psychology echoes many Swadharma principles through concepts like authentic living, self-determination 
              theory, and values-based action. Research consistently shows that alignment between actions and internal 
              values predicts well-being, life satisfaction, and psychological health.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Discovering Your Swadharma
            </h2>
            <p>
              Identifying your Swadharma involves deep self-reflection, understanding your natural inclinations, 
              recognizing your values, and considering your life circumstances. It's an ongoing process rather than a 
              one-time discovery.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Key Questions for Reflection
            </h3>
            <ul>
              <li>What activities feel natural and energizing to me?</li>
              <li>What values are most important in my life?</li>
              <li>What are my unique strengths and inclinations?</li>
              <li>What duties and responsibilities do my circumstances require?</li>
              <li>How can I honor both my personal fulfillment and my responsibilities?</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Balancing Duty and Personal Fulfillment
            </h2>
            <p>
              Swadharma doesn't suggest abandoning responsibilities—it emphasizes finding ways to fulfill duties that 
              align with your nature and values, creating a sustainable balance between obligation and personal 
              fulfillment.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What is Swadharma?
                </h3>
                <p>
                  Swadharma refers to one's own duty or true nature—the path that aligns with your inherent qualities, 
                  values, and life circumstances. It emphasizes acting according to your authentic self rather than 
                  following external expectations or imitating others.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How does Swadharma relate to modern psychology?
                </h3>
                <p>
                  Swadharma aligns with psychological concepts like authentic living, values-based action, 
                  self-determination theory, and identity integration. It emphasizes the importance of aligning 
                  behavior with internal values rather than external pressures, which research shows leads to greater 
                  well-being and life satisfaction.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Living Your Swadharma
            </h2>
            <p>
              Understanding and living according to your Swadharma isn't about finding a perfect path—it's about 
              continuously aligning your actions with your authentic nature, values, and circumstances. This alignment 
              creates a sense of purpose, reduces inner conflict, and enables sustainable engagement with life's 
              responsibilities while maintaining personal fulfillment and well-being.
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

