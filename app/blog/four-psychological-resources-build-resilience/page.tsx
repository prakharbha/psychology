import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Four Psychological Resources That Build Resilience | Resilience Psychology',
  description: 'Discover the four essential psychological resources that build resilience: self-efficacy, optimism, social support, and adaptability. Learn evidence-based strategies for developing these resources.',
  keywords: 'resilience, psychological resources, resilience psychology, coping strategies, mental resilience, psychological resilience, stress resilience, resilience building',
  openGraph: {
    title: 'The Four Psychological Resources That Build Resilience',
    description: 'Discover the four essential psychological resources that build resilience.',
    type: 'article',
    publishedTime: '2025-04-18T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'The four psychological resources that build resilience: self-efficacy, optimism, social support, and adaptability',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Four Psychological Resources That Build Resilience',
    description: 'Discover the four essential psychological resources that build resilience.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/four-psychological-resources-build-resilience',
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
    headline: 'The Four Psychological Resources That Build Resilience',
    description: 'Discover the four essential psychological resources that build resilience.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2025-04-18T00:00:00Z',
    dateModified: '2025-04-18T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Four Psychological Resources', item: 'https://www.prakharpsychologicaltest.com/blog/four-psychological-resources-build-resilience' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the four psychological resources for resilience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The four key psychological resources for resilience are: self-efficacy (belief in your ability to handle challenges), optimism (positive expectations about the future), social support (strong relationships and networks), and adaptability (flexibility in thinking and behavior). These resources work together to enable individuals to bounce back from adversity and thrive despite challenges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can resilience be developed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, resilience is not a fixed trait—it\'s a set of skills and resources that can be developed and strengthened. Through intentional practice, building self-efficacy through mastery experiences, cultivating realistic optimism, investing in relationships, and developing flexible thinking patterns, anyone can enhance their resilience over time.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Four Psychological Resources</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The Four Psychological Resources That Build Resilience
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-29">January 29, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="The four psychological resources that build resilience: self-efficacy, optimism, social support, and adaptability"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Resilience—the ability to bounce back from adversity and thrive despite challenges—isn't a mysterious 
              trait reserved for the naturally strong. It's a psychological capacity built from specific resources that 
              can be understood, developed, and strengthened. Research across decades of resilience studies identifies 
              four core psychological resources that consistently predict and enable resilient responses to life's 
              difficulties.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Understanding Resilience: More Than Just Bouncing Back
            </h2>
            <p>
              Resilience isn't about avoiding difficulties or never experiencing distress. It's about having the 
              psychological resources to navigate challenges effectively, learn from adversity, and emerge stronger. 
              These resources work together, creating a psychological foundation that supports adaptive responses to stress.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Resource</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Definition</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Resilience Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Self-Efficacy</td>
                    <td className="border border-slate-300 px-4 py-3">Belief in ability to handle challenges</td>
                    <td className="border border-slate-300 px-4 py-3">Enables action and persistence</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Optimism</td>
                    <td className="border border-slate-300 px-4 py-3">Positive expectations about future</td>
                    <td className="border border-slate-300 px-4 py-3">Maintains motivation and hope</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Social Support</td>
                    <td className="border border-slate-300 px-4 py-3">Strong relationships and networks</td>
                    <td className="border border-slate-300 px-4 py-3">Provides resources and emotional buffer</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Adaptability</td>
                    <td className="border border-slate-300 px-4 py-3">Flexibility in thinking and behavior</td>
                    <td className="border border-slate-300 px-4 py-3">Enables problem-solving and adjustment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              1. Self-Efficacy: The Foundation of Action
            </h2>
            <p>
              Self-efficacy—the belief in your ability to succeed in specific situations—is the psychological resource 
              that transforms challenges into manageable tasks. When you believe you can handle difficulties, you're more 
              likely to take action, persist through obstacles, and recover from setbacks.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Building Self-Efficacy
            </h3>
            <ul>
              <li>Set and achieve small, incremental goals</li>
              <li>Learn from others' successes (vicarious experiences)</li>
              <li>Seek encouragement and positive feedback</li>
              <li>Manage stress and emotional states effectively</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              2. Optimism: The Power of Positive Expectations
            </h2>
            <p>
              Realistic optimism—the expectation that things will work out reasonably well—maintains motivation and 
              hope during difficult times. It's not about denying reality but about maintaining a constructive 
              perspective that enables problem-solving and forward movement.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              3. Social Support: The Relational Buffer
            </h2>
            <p>
              Strong social connections provide emotional support, practical assistance, diverse perspectives, and a sense 
              of belonging that buffers against stress and enhances resilience. The quality of relationships matters more 
              than quantity.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              4. Adaptability: The Flexibility Factor
            </h2>
            <p>
              Adaptability—the ability to adjust thinking and behavior in response to changing circumstances—enables 
              resilient individuals to find creative solutions, shift strategies when needed, and thrive in uncertain 
              conditions.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              How the Resources Work Together
            </h2>
            <p>
              These four resources don't operate in isolation—they create a synergistic system. High self-efficacy 
              enables you to seek support when needed. Optimism helps you maintain effort when building self-efficacy. 
              Social support provides feedback that strengthens self-efficacy and maintains optimism. Adaptability allows 
              you to use all resources effectively across different situations.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the four psychological resources for resilience?
                </h3>
                <p>
                  The four key psychological resources for resilience are: self-efficacy (belief in your ability to 
                  handle challenges), optimism (positive expectations about the future), social support (strong 
                  relationships and networks), and adaptability (flexibility in thinking and behavior). These resources 
                  work together to enable individuals to bounce back from adversity and thrive despite challenges.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  Can resilience be developed?
                </h3>
                <p>
                  Yes, resilience is not a fixed trait—it's a set of skills and resources that can be developed and 
                  strengthened. Through intentional practice, building self-efficacy through mastery experiences, 
                  cultivating realistic optimism, investing in relationships, and developing flexible thinking patterns, 
                  anyone can enhance their resilience over time.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Building Your Resilience Resources
            </h2>
            <p>
              Resilience isn't about being invulnerable—it's about having the psychological resources to navigate 
              challenges effectively. By understanding and intentionally developing these four core resources—self-efficacy, 
              optimism, social support, and adaptability—you can build a foundation of resilience that enables you to 
              not just survive difficulties but grow through them.
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

