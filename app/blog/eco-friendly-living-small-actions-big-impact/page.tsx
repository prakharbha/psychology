import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eco-Friendly Living: Small Actions That Create Big Impact | Environmental Psychology',
  description: 'Discover how small eco-friendly actions create significant environmental and psychological benefits. Learn practical strategies for sustainable living and the psychological rewards of environmental consciousness.',
  keywords: 'eco-friendly living, sustainable living, environmental psychology, green living, sustainability, environmental consciousness, climate action, eco-psychology',
  openGraph: {
    title: 'Eco-Friendly Living: Small Actions That Create Big Impact',
    description: 'Discover how small eco-friendly actions create significant environmental and psychological benefits.',
    type: 'article',
    publishedTime: '2025-02-05T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'Eco-friendly living: small actions that create big impact on well-being and environment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco-Friendly Living: Small Actions That Create Big Impact',
    description: 'Discover how small eco-friendly actions create big impact.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/eco-friendly-living-small-actions-big-impact',
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
    headline: 'Eco-Friendly Living: Small Actions That Create Big Impact',
    description: 'Discover how small eco-friendly actions create significant environmental and psychological benefits.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2025-02-05T00:00:00Z',
    dateModified: '2025-02-05T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Eco-Friendly Living', item: 'https://www.prakharpsychologicaltest.com/blog/eco-friendly-living-small-actions-big-impact' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are small eco-friendly actions I can take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Small eco-friendly actions include: reducing single-use plastics, conserving water and energy, choosing sustainable transportation options, supporting local and sustainable products, reducing waste through recycling and composting, planting trees or supporting reforestation, reducing meat consumption, and educating others about environmental issues. These actions, when practiced consistently, create significant cumulative impact.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the psychological benefits of eco-friendly living?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eco-friendly living provides multiple psychological benefits: sense of purpose and meaning through contributing to something larger, reduced eco-anxiety by taking action, increased self-efficacy through making a difference, connection to nature and community, alignment with values creating authenticity, and positive identity as an environmental steward. These benefits enhance overall well-being and life satisfaction.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Eco-Friendly Living</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Eco-Friendly Living: Small Actions That Create Big Impact
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-02-05">February 5, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="Eco-friendly living: small actions that create big impact on well-being and environment"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              The scale of environmental challenges can feel overwhelming, leading many to believe that individual actions 
              don't matter. However, psychological and environmental research reveals that small, consistent eco-friendly 
              actions create significant cumulative impact—both for the planet and for personal well-being. Understanding 
              how individual choices contribute to collective change, and recognizing the psychological benefits of 
              environmental consciousness, provides motivation for sustainable living.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Power of Cumulative Action
            </h2>
            <p>
              Individual actions, when multiplied across millions of people, create transformative change. Research 
              demonstrates that small behavioral shifts, consistently practiced, generate substantial environmental impact 
              over time.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Action</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Individual Impact</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Collective Potential</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Reduce Single-Use Plastics</td>
                    <td className="border border-slate-300 px-4 py-3">Saves hundreds of items annually</td>
                    <td className="border border-slate-300 px-4 py-3">Massive reduction in plastic waste</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Energy Conservation</td>
                    <td className="border border-slate-300 px-4 py-3">Reduces carbon footprint</td>
                    <td className="border border-slate-300 px-4 py-3">Significant emissions reduction</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Sustainable Transportation</td>
                    <td className="border border-slate-300 px-4 py-3">Lowers personal emissions</td>
                    <td className="border border-slate-300 px-4 py-3">Transforms transportation systems</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Support Local/Sustainable</td>
                    <td className="border border-slate-300 px-4 py-3">Reduces supply chain impact</td>
                    <td className="border border-slate-300 px-4 py-3">Shifts market demand</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Psychological Benefits of Eco-Friendly Living
            </h2>
            <p>
              Beyond environmental impact, eco-friendly living provides significant psychological benefits that enhance 
              well-being and life satisfaction.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Practical Strategies for Eco-Friendly Living
            </h2>
            <p>
              Sustainable living doesn't require perfection—it involves making consistent, manageable choices that align 
              with environmental values.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are small eco-friendly actions I can take?
                </h3>
                <p>
                  Small eco-friendly actions include: reducing single-use plastics, conserving water and energy, choosing 
                  sustainable transportation options, supporting local and sustainable products, reducing waste through 
                  recycling and composting, planting trees or supporting reforestation, reducing meat consumption, and 
                  educating others about environmental issues. These actions, when practiced consistently, create 
                  significant cumulative impact.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the psychological benefits of eco-friendly living?
                </h3>
                <p>
                  Eco-friendly living provides multiple psychological benefits: sense of purpose and meaning through 
                  contributing to something larger, reduced eco-anxiety by taking action, increased self-efficacy through 
                  making a difference, connection to nature and community, alignment with values creating authenticity, 
                  and positive identity as an environmental steward. These benefits enhance overall well-being and life 
                  satisfaction.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Small Steps, Big Change
            </h2>
            <p>
              Eco-friendly living demonstrates that individual actions matter—both for environmental impact and personal 
              well-being. By making small, consistent choices aligned with environmental values, we contribute to 
              collective change while experiencing the psychological benefits of purposeful, values-aligned living. Every 
              action counts, and together, these small steps create transformative impact.
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

