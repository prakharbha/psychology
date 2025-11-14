import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Workplace Climate Influences Productivity & Happiness | Organizational Psychology',
  description: 'Discover how workplace climate affects employee productivity, job satisfaction, and well-being. Learn about psychological safety, organizational culture, and evidence-based strategies for creating positive work environments.',
  keywords: 'workplace climate, organizational psychology, workplace culture, employee productivity, job satisfaction, workplace well-being, psychological safety, organizational behavior',
  openGraph: {
    title: 'How Workplace Climate Influences Productivity & Happiness',
    description: 'Discover how workplace climate affects employee productivity and job satisfaction.',
    type: 'article',
    publishedTime: '2025-06-02T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-workplace-climate.jpg',
        width: 1200,
        height: 630,
        alt: 'How workplace climate influences productivity and employee happiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Workplace Climate Influences Productivity & Happiness',
    description: 'Discover how workplace climate affects employee productivity.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-workplace-climate.jpg'],
  },
  alternates: {
    canonical: '/blog/workplace-climate-productivity-happiness',
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
    headline: 'How Workplace Climate Influences Productivity & Happiness',
    description: 'Discover how workplace climate affects employee productivity and job satisfaction.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-workplace-climate.jpg',
    datePublished: '2025-06-02T00:00:00Z',
    dateModified: '2025-06-02T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Workplace Climate', item: 'https://www.prakharpsychologicaltest.com/blog/workplace-climate-productivity-happiness' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does workplace climate affect productivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Workplace climate significantly impacts productivity through multiple pathways: psychological safety enables risk-taking and innovation, supportive environments reduce stress and cognitive load, positive relationships enhance collaboration, and clear communication improves efficiency. Research shows that positive workplace climates can increase productivity by 20-30% compared to negative climates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What creates a positive workplace climate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A positive workplace climate is created through psychological safety (feeling safe to express ideas), supportive leadership, clear communication, recognition and appreciation, work-life balance, opportunities for growth, fair treatment, and collaborative relationships. These factors combine to create an environment where employees feel valued, engaged, and motivated.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Workplace Climate</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How Workplace Climate Influences Productivity & Happiness
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-26">January 26, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-workplace-climate.jpg" 
                alt="How workplace climate influences productivity and employee happiness"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              The environment in which we work doesn't just affect our mood—it fundamentally shapes our performance, 
              creativity, engagement, and overall well-being. Workplace climate, the shared perceptions of organizational 
              policies, practices, and procedures, creates an invisible force field that either enables excellence or 
              undermines potential. Understanding this psychological environment and its impact is crucial for both 
              employees seeking fulfillment and organizations aiming for peak performance.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Defining Workplace Climate: Beyond Physical Space
            </h2>
            <p>
              Workplace climate encompasses the psychological, social, and emotional atmosphere of an organization. 
              It's distinct from culture (deep-seated values and beliefs) in that climate refers to employees' 
              perceptions of their immediate work environment and how it affects them.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Climate Dimension</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact on Productivity</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact on Happiness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Psychological Safety</td>
                    <td className="border border-slate-300 px-4 py-3">High - enables innovation and risk-taking</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - reduces anxiety and stress</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Supportive Leadership</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - increases engagement</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - creates sense of value</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Work-Life Balance</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate-High - prevents burnout</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - essential for well-being</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Recognition & Appreciation</td>
                    <td className="border border-slate-300 px-4 py-3">High - motivates performance</td>
                    <td className="border border-slate-300 px-4 py-3">High - enhances satisfaction</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Clear Communication</td>
                    <td className="border border-slate-300 px-4 py-3">Very High - reduces errors and confusion</td>
                    <td className="border border-slate-300 px-4 py-3">High - reduces uncertainty and stress</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Productivity Connection: How Climate Drives Performance
            </h2>
            <p>
              Research consistently demonstrates that workplace climate is a stronger predictor of productivity than 
              individual talent or resources. Positive climates enable employees to focus their cognitive resources on 
              work rather than managing stress, navigating conflict, or protecting themselves from criticism.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Mechanisms of Impact
            </h3>
            <ul>
              <li><strong>Cognitive Load Reduction:</strong> Positive climates reduce mental energy spent on stress management</li>
              <li><strong>Enhanced Collaboration:</strong> Trust and safety enable effective teamwork</li>
              <li><strong>Innovation Enablement:</strong> Psychological safety allows creative risk-taking</li>
              <li><strong>Engagement Boost:</strong> Supportive environments increase intrinsic motivation</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Happiness Factor: Well-Being at Work
            </h2>
            <p>
              Workplace climate doesn't just affect productivity—it significantly impacts employee happiness, mental 
              health, and overall life satisfaction. Since work occupies a substantial portion of our waking hours, 
              the workplace climate becomes a major determinant of overall well-being.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Creating Positive Workplace Climates: Evidence-Based Strategies
            </h2>
            <p>
              Building a positive workplace climate requires intentional, consistent effort across multiple dimensions. 
              Research identifies several key strategies.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How does workplace climate affect productivity?
                </h3>
                <p>
                  Workplace climate significantly impacts productivity through multiple pathways: psychological safety 
                  enables risk-taking and innovation, supportive environments reduce stress and cognitive load, positive 
                  relationships enhance collaboration, and clear communication improves efficiency. Research shows that 
                  positive workplace climates can increase productivity by 20-30% compared to negative climates.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What creates a positive workplace climate?
                </h3>
                <p>
                  A positive workplace climate is created through psychological safety (feeling safe to express ideas), 
                  supportive leadership, clear communication, recognition and appreciation, work-life balance, 
                  opportunities for growth, fair treatment, and collaborative relationships. These factors combine to 
                  create an environment where employees feel valued, engaged, and motivated.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: The Climate Imperative
            </h2>
            <p>
              Workplace climate isn't a nice-to-have—it's a fundamental driver of both organizational success and 
              employee well-being. By understanding how climate influences productivity and happiness, and implementing 
              evidence-based strategies to create positive environments, organizations can unlock human potential while 
              employees can find greater fulfillment in their work.
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

