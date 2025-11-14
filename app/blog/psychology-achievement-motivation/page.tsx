import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What Drives High Performers? The Psychology of Achievement Motivation',
  description: 'Explore the psychological factors that drive high performers: intrinsic vs extrinsic motivation, growth mindset, goal-setting strategies, and the science behind sustained achievement.',
  keywords: 'achievement motivation, high performers, motivation psychology, intrinsic motivation, growth mindset, goal setting, performance psychology, success psychology',
  openGraph: {
    title: 'What Drives High Performers? The Psychology of Achievement Motivation',
    description: 'Explore the psychological factors that drive high performers and sustained achievement.',
    type: 'article',
    publishedTime: '2025-09-15T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-achievement-motivation.jpg',
        width: 1200,
        height: 630,
        alt: 'High performers and the psychology of achievement motivation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Drives High Performers? The Psychology of Achievement Motivation',
    description: 'Explore the psychological factors that drive high performers.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-achievement-motivation.jpg'],
  },
  alternates: {
    canonical: '/blog/psychology-achievement-motivation',
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
    headline: 'What Drives High Performers? The Psychology of Achievement Motivation',
    description: 'Explore the psychological factors that drive high performers and sustained achievement.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-achievement-motivation.jpg',
    datePublished: '2025-09-15T00:00:00Z',
    dateModified: '2025-09-15T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Psychology of Achievement Motivation', item: 'https://www.prakharpsychologicaltest.com/blog/psychology-achievement-motivation' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What motivates high performers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High performers are typically driven by intrinsic motivation—internal factors like personal growth, mastery, autonomy, and purpose. They also demonstrate a growth mindset, viewing challenges as opportunities to learn rather than threats to their self-worth.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can achievement motivation be developed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, achievement motivation can be cultivated through developing a growth mindset, setting meaningful goals, building self-efficacy, practicing deliberate effort, and finding intrinsic rewards in the process of improvement rather than just outcomes.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Psychology of Achievement Motivation</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Drives High Performers? The Psychology of Achievement Motivation
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-19">January 19, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-achievement-motivation.jpg" 
                alt="High performers and the psychology of achievement motivation including intrinsic motivation and growth mindset"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              What separates high performers from the rest? Is it talent, luck, or something deeper? Decades of 
              psychological research reveal that sustained high performance stems from specific motivational patterns 
              and psychological frameworks that can be understood, developed, and optimized. The drivers of achievement 
              aren't mysterious—they're rooted in how individuals relate to goals, challenges, and their own potential.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Foundation: Intrinsic vs. Extrinsic Motivation
            </h2>
            <p>
              High performers consistently demonstrate a preference for intrinsic motivation—they're driven by internal 
              factors like personal growth, mastery, autonomy, and purpose rather than external rewards like money, 
              recognition, or status.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Motivation Type</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Source</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Sustainability</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Performance Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Intrinsic</td>
                    <td className="border border-slate-300 px-4 py-3">Internal satisfaction, growth, mastery</td>
                    <td className="border border-slate-300 px-4 py-3">High - self-sustaining</td>
                    <td className="border border-slate-300 px-4 py-3">Long-term excellence</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Extrinsic</td>
                    <td className="border border-slate-300 px-4 py-3">External rewards, recognition, status</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate - requires reinforcement</td>
                    <td className="border border-slate-300 px-4 py-3">Variable, can decline</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Growth Mindset: Viewing Challenges as Opportunities
            </h2>
            <p>
              Carol Dweck's research on mindset reveals that high performers share a fundamental belief: abilities can be 
              developed through dedication and hard work. This growth mindset transforms how individuals approach 
              challenges, setbacks, and effort.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Goal-Setting Strategies That Drive Performance
            </h2>
            <p>
              High performers don't just set goals—they set the right kinds of goals in the right ways. Research 
              identifies several key principles.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Mastery Goals vs. Performance Goals
            </h3>
            <p>
              Mastery-oriented individuals focus on developing competence and improving their skills, while 
              performance-oriented individuals focus on demonstrating ability and outperforming others. Mastery goals 
              predict sustained motivation and resilience.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Self-Efficacy: The Belief in One's Capabilities
            </h2>
            <p>
              Albert Bandura's concept of self-efficacy—the belief in one's ability to succeed in specific situations—is 
              a powerful predictor of achievement. High performers develop strong self-efficacy through mastery 
              experiences, vicarious learning, and positive reinforcement.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What motivates high performers?
                </h3>
                <p>
                  High performers are typically driven by intrinsic motivation—internal factors like personal growth, 
                  mastery, autonomy, and purpose. They also demonstrate a growth mindset, viewing challenges as 
                  opportunities to learn rather than threats to their self-worth.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  Can achievement motivation be developed?
                </h3>
                <p>
                  Yes, achievement motivation can be cultivated through developing a growth mindset, setting meaningful 
                  goals, building self-efficacy, practicing deliberate effort, and finding intrinsic rewards in the 
                  process of improvement rather than just outcomes.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Building Your Achievement Motivation
            </h2>
            <p>
              High performance isn't reserved for the naturally gifted—it's accessible to anyone willing to develop 
              the psychological frameworks that drive sustained achievement. By cultivating intrinsic motivation, 
              adopting a growth mindset, setting mastery-oriented goals, and building self-efficacy, you can unlock 
              your potential for excellence.
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

