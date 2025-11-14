import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Academic Pressure Impacts Performance & Well-Being | Student Psychology',
  description: 'Explore how academic pressure affects student performance and well-being. Learn about the Yerkes-Dodson law, optimal stress levels, and strategies for managing academic pressure effectively.',
  keywords: 'academic pressure, student stress, academic performance, student well-being, academic anxiety, performance psychology, stress management, educational psychology',
  openGraph: {
    title: 'How Academic Pressure Impacts Performance & Well-Being',
    description: 'Explore how academic pressure affects student performance and well-being.',
    type: 'article',
    publishedTime: '2025-01-21T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-academic-pressure.jpg',
        width: 1200,
        height: 630,
        alt: 'Academic pressure and its impact on student performance and well-being',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Academic Pressure Impacts Performance & Well-Being',
    description: 'Explore how academic pressure affects student performance and well-being.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-academic-pressure.jpg'],
  },
  alternates: {
    canonical: '/blog/academic-pressure-performance-wellbeing',
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
    headline: 'How Academic Pressure Impacts Performance & Well-Being',
    description: 'Explore how academic pressure affects student performance and well-being.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-academic-pressure.jpg',
    datePublished: '2025-01-21T00:00:00Z',
    dateModified: '2025-01-21T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Academic Pressure & Performance', item: 'https://www.prakharpsychologicaltest.com/blog/academic-pressure-performance-wellbeing' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does academic pressure affect performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Academic pressure follows the Yerkes-Dodson law: moderate pressure enhances performance, but excessive pressure impairs it. Too little pressure leads to underperformance, while too much creates anxiety, cognitive overload, and decreased performance. The optimal level varies by individual and task complexity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the signs of excessive academic pressure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Signs include chronic anxiety, sleep disturbances, physical symptoms (headaches, stomach issues), difficulty concentrating, perfectionism, social withdrawal, decreased motivation, and declining performance despite increased effort.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Academic Pressure & Performance</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How Academic Pressure Impacts Performance & Well-Being
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-21">January 21, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-academic-pressure.jpg" 
                alt="Academic pressure and its impact on student performance and well-being"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Academic pressure is a double-edged sword. In moderation, it can motivate students to excel, focus their 
              attention, and achieve their potential. But when pressure becomes excessive, it transforms from a 
              performance enhancer into a well-being destroyer, impairing both academic outcomes and mental health. 
              Understanding this delicate balance is crucial for students, educators, and parents navigating the 
              complexities of modern education.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Yerkes-Dodson Law: The Pressure-Performance Curve
            </h2>
            <p>
              The relationship between pressure and performance follows an inverted U-curve, known as the Yerkes-Dodson 
              law. This principle reveals that performance improves with increasing pressure up to an optimal point, 
              after which further pressure actually decreases performance.
            </p>

            <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">The Performance Curve</h3>
              <p className="mb-2"><strong>Low Pressure:</strong> Underperformance, lack of motivation, procrastination</p>
              <p className="mb-2"><strong>Optimal Pressure:</strong> Peak performance, focused attention, engagement</p>
              <p><strong>Excessive Pressure:</strong> Anxiety, cognitive overload, performance decline, burnout</p>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Sources of Academic Pressure
            </h2>
            <p>
              Academic pressure doesn't emerge from a single source—it accumulates from multiple directions, each 
              contributing to the overall stress load students experience.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Source</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact Level</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Manageability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Parental Expectations</td>
                    <td className="border border-slate-300 px-4 py-3">High</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate - requires communication</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Competitive Environment</td>
                    <td className="border border-slate-300 px-4 py-3">Very High</td>
                    <td className="border border-slate-300 px-4 py-3">Low - systemic issue</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Self-Imposed Standards</td>
                    <td className="border border-slate-300 px-4 py-3">Very High</td>
                    <td className="border border-slate-300 px-4 py-3">High - personal control</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Future Uncertainty</td>
                    <td className="border border-slate-300 px-4 py-3">High</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate - requires perspective</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Workload Volume</td>
                    <td className="border border-slate-300 px-4 py-3">High</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate - time management</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Well-Being Impact: Beyond Performance
            </h2>
            <p>
              While performance metrics are easily measured, the impact of academic pressure on well-being is often 
              overlooked until it reaches crisis levels. Chronic excessive pressure affects multiple dimensions of health.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Mental Health Consequences
            </h3>
            <ul>
              <li>Increased anxiety and depression rates</li>
              <li>Sleep disturbances and fatigue</li>
              <li>Decreased self-esteem and confidence</li>
              <li>Social withdrawal and isolation</li>
              <li>Development of maladaptive coping strategies</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Strategies for Managing Academic Pressure
            </h2>
            <p>
              Effective pressure management involves both reducing excessive pressure and optimizing beneficial pressure 
              to enhance performance without compromising well-being.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              For Students
            </h3>
            <ul>
              <li>Develop realistic, mastery-oriented goals</li>
              <li>Practice time management and prioritization</li>
              <li>Build stress-reduction techniques (mindfulness, exercise)</li>
              <li>Maintain social connections and support networks</li>
              <li>Seek help when pressure becomes overwhelming</li>
            </ul>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              For Parents and Educators
            </h3>
            <ul>
              <li>Focus on effort and growth rather than outcomes</li>
              <li>Create supportive rather than punitive environments</li>
              <li>Recognize individual differences in pressure tolerance</li>
              <li>Model healthy stress management</li>
              <li>Provide resources for mental health support</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How does academic pressure affect performance?
                </h3>
                <p>
                  Academic pressure follows the Yerkes-Dodson law: moderate pressure enhances performance, but excessive 
                  pressure impairs it. Too little pressure leads to underperformance, while too much creates anxiety, 
                  cognitive overload, and decreased performance. The optimal level varies by individual and task complexity.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the signs of excessive academic pressure?
                </h3>
                <p>
                  Signs include chronic anxiety, sleep disturbances, physical symptoms (headaches, stomach issues), 
                  difficulty concentrating, perfectionism, social withdrawal, decreased motivation, and declining 
                  performance despite increased effort.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Finding the Balance
            </h2>
            <p>
              Academic pressure isn't inherently bad—it's a tool that, when used appropriately, can enhance learning 
              and achievement. The challenge lies in recognizing when pressure crosses from motivating to harmful, and 
              in developing systems and strategies that maintain optimal pressure levels while protecting student 
              well-being. By understanding the pressure-performance relationship and implementing evidence-based 
              strategies, we can create educational environments that foster both excellence and health.
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

