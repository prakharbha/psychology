import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Couples Can Build a Balanced & Supportive Marriage | Relationship Psychology',
  description: 'Explore evidence-based strategies for building a balanced and supportive marriage. Learn about communication patterns, emotional support, conflict resolution, and relationship maintenance practices.',
  keywords: 'marriage, relationship psychology, couples therapy, relationship advice, marriage counseling, relationship communication, marital satisfaction, relationship health',
  openGraph: {
    title: 'How Couples Can Build a Balanced & Supportive Marriage',
    description: 'Explore evidence-based strategies for building a balanced and supportive marriage.',
    type: 'article',
    publishedTime: '2024-12-19T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'How couples can build a balanced and supportive marriage through evidence-based strategies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Couples Can Build a Balanced & Supportive Marriage',
    description: 'Explore strategies for building a balanced and supportive marriage.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/couples-build-balanced-supportive-marriage',
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
    headline: 'How Couples Can Build a Balanced & Supportive Marriage',
    description: 'Explore evidence-based strategies for building a balanced and supportive marriage.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2024-12-19T00:00:00Z',
    dateModified: '2024-12-19T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Building a Balanced Marriage', item: 'https://www.prakharpsychologicaltest.com/blog/couples-build-balanced-supportive-marriage' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a balanced and supportive marriage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A balanced and supportive marriage includes: effective communication with active listening and expression, mutual emotional support during challenges, shared responsibilities and decision-making, respect for individual needs and boundaries, healthy conflict resolution without destructive patterns, regular connection and quality time, appreciation and gratitude, and shared values and goals. Balance means both partners feel heard, valued, and supported while maintaining individual identities.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can couples improve their marriage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Couples can improve their marriage by: practicing active listening and empathy, expressing appreciation regularly, scheduling quality time together, developing healthy conflict resolution skills, supporting each other\'s goals and growth, maintaining individual interests and friendships, seeking professional help when needed, and continuously investing in the relationship. Small, consistent efforts often have more impact than occasional grand gestures.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Building a Balanced Marriage</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How Couples Can Build a Balanced & Supportive Marriage
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-02-06">February 6, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="How couples can build a balanced and supportive marriage through evidence-based strategies"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              A balanced and supportive marriage doesn't happen by accident—it's built through intentional practices, 
              effective communication, and mutual commitment to growth. Research in relationship psychology reveals 
              specific patterns and behaviors that distinguish thriving marriages from struggling ones. Understanding 
              these evidence-based principles provides couples with practical strategies for creating relationships that 
              are both deeply connected and individually fulfilling.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Foundations of a Balanced Marriage
            </h2>
            <p>
              A balanced marriage integrates connection and autonomy, support and independence, togetherness and 
              individual growth. This balance requires attention to multiple relationship dimensions.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Dimension</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Key Components</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact on Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Communication</td>
                    <td className="border border-slate-300 px-4 py-3">Active listening, expression, validation</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - foundation for all else</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Emotional Support</td>
                    <td className="border border-slate-300 px-4 py-3">Empathy, responsiveness, availability</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - creates security</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Shared Responsibilities</td>
                    <td className="border border-slate-300 px-4 py-3">Fair division, collaboration, flexibility</td>
                    <td className="border border-slate-300 px-4 py-3">High - reduces resentment</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Individual Autonomy</td>
                    <td className="border border-slate-300 px-4 py-3">Personal interests, friendships, growth</td>
                    <td className="border border-slate-300 px-4 py-3">High - prevents enmeshment</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Conflict Resolution</td>
                    <td className="border border-slate-300 px-4 py-3">Healthy patterns, repair, compromise</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - determines relationship health</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Effective Communication: The Cornerstone
            </h2>
            <p>
              Communication quality is the strongest predictor of marital satisfaction. Effective communication involves 
              not just talking but truly understanding and being understood.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Building Emotional Support
            </h2>
            <p>
              Emotional support—feeling understood, valued, and cared for—creates the security that enables intimacy 
              and vulnerability in marriage.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Maintaining Balance: Connection and Autonomy
            </h2>
            <p>
              A balanced marriage honors both connection and individual autonomy. Partners maintain their own interests, 
              friendships, and growth while investing in the relationship.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What makes a balanced and supportive marriage?
                </h3>
                <p>
                  A balanced and supportive marriage includes: effective communication with active listening and 
                  expression, mutual emotional support during challenges, shared responsibilities and decision-making, 
                  respect for individual needs and boundaries, healthy conflict resolution without destructive patterns, 
                  regular connection and quality time, appreciation and gratitude, and shared values and goals. Balance 
                  means both partners feel heard, valued, and supported while maintaining individual identities.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How can couples improve their marriage?
                </h3>
                <p>
                  Couples can improve their marriage by: practicing active listening and empathy, expressing appreciation 
                  regularly, scheduling quality time together, developing healthy conflict resolution skills, supporting 
                  each other's goals and growth, maintaining individual interests and friendships, seeking professional 
                  help when needed, and continuously investing in the relationship. Small, consistent efforts often have 
                  more impact than occasional grand gestures.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Building Your Balanced Marriage
            </h2>
            <p>
              A balanced and supportive marriage is built through daily practices of communication, support, respect, and 
              growth. By understanding the evidence-based principles that contribute to marital satisfaction and 
              implementing them consistently, couples can create relationships that are both deeply connected and 
              individually fulfilling. The investment in building these patterns pays dividends in relationship quality, 
              individual well-being, and long-term satisfaction.
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

