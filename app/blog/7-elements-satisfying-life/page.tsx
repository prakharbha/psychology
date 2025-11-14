import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '7 Elements of a Truly Satisfying Life | Psychology of Life Satisfaction',
  description: 'Discover the seven essential elements that contribute to a truly satisfying life: purpose, relationships, growth, contribution, autonomy, health, and joy. Evidence-based insights for lasting fulfillment.',
  keywords: 'life satisfaction, happiness, well-being, life fulfillment, positive psychology, meaningful life, life purpose, quality of life',
  openGraph: {
    title: '7 Elements of a Truly Satisfying Life',
    description: 'Discover the seven essential elements that contribute to a truly satisfying life.',
    type: 'article',
    publishedTime: '2025-01-20T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Elements of a Truly Satisfying Life',
    description: 'Discover the seven essential elements that contribute to a truly satisfying life.',
  },
  alternates: {
    canonical: '/blog/7-elements-satisfying-life',
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
    headline: '7 Elements of a Truly Satisfying Life',
    description: 'Discover the seven essential elements that contribute to a truly satisfying life.',
    datePublished: '2025-01-20T00:00:00Z',
    dateModified: '2025-01-20T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: '7 Elements of a Satisfying Life', item: 'https://www.prakharpsychologicaltest.com/blog/7-elements-satisfying-life' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the 7 elements of a satisfying life?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The seven elements are: purpose (meaning and direction), relationships (deep connections), growth (continuous development), contribution (making a difference), autonomy (freedom and control), health (physical and mental well-being), and joy (regular positive experiences).',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">7 Elements of a Satisfying Life</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              7 Elements of a Truly Satisfying Life
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-20">January 20, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Life satisfaction isn't a single achievement or moment—it's a complex tapestry woven from multiple 
              psychological, social, and existential threads. Research across positive psychology, well-being studies, 
              and longitudinal life satisfaction research reveals seven core elements that consistently predict and 
              contribute to a truly satisfying life. Understanding these elements provides a framework for intentional 
              living and sustainable fulfillment.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Seven Pillars of Life Satisfaction
            </h2>
            <p>
              These elements aren't ranked in importance—they're interconnected dimensions that work together to 
              create a holistic sense of satisfaction and well-being.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Element</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Core Component</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact on Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">1. Purpose</td>
                    <td className="border border-slate-300 px-4 py-3">Meaning, direction, values alignment</td>
                    <td className="border border-slate-300 px-4 py-3">Provides foundation and motivation</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">2. Relationships</td>
                    <td className="border border-slate-300 px-4 py-3">Deep connections, social support</td>
                    <td className="border border-slate-300 px-4 py-3">Strongest predictor of happiness</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">3. Growth</td>
                    <td className="border border-slate-300 px-4 py-3">Learning, development, progress</td>
                    <td className="border border-slate-300 px-4 py-3">Prevents stagnation, builds confidence</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">4. Contribution</td>
                    <td className="border border-slate-300 px-4 py-3">Making a difference, service</td>
                    <td className="border border-slate-300 px-4 py-3">Creates sense of significance</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">5. Autonomy</td>
                    <td className="border border-slate-300 px-4 py-3">Freedom, control, self-direction</td>
                    <td className="border border-slate-300 px-4 py-3">Enables authentic living</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">6. Health</td>
                    <td className="border border-slate-300 px-4 py-3">Physical and mental well-being</td>
                    <td className="border border-slate-300 px-4 py-3">Foundation for all other elements</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">7. Joy</td>
                    <td className="border border-slate-300 px-4 py-3">Positive experiences, pleasure, fun</td>
                    <td className="border border-slate-300 px-4 py-3">Adds vibrancy and enjoyment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              1. Purpose: The Compass of Meaning
            </h2>
            <p>
              Purpose provides direction and meaning—it's the "why" that gives context to your actions and choices. 
              Research shows that people with a strong sense of purpose report higher life satisfaction, better health 
              outcomes, and greater resilience.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              2. Relationships: The Foundation of Connection
            </h2>
            <p>
              The Harvard Study of Adult Development, one of the longest-running studies on human happiness, found that 
              relationships are the strongest predictor of life satisfaction. Quality matters more than quantity—deep, 
              meaningful connections provide support, joy, and a sense of belonging.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              3. Growth: The Path of Continuous Development
            </h2>
            <p>
              Human beings are wired for growth. When we stop developing, we stagnate. Continuous learning, skill 
              development, and personal evolution contribute significantly to life satisfaction by providing a sense of 
              progress and capability.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              4. Contribution: Making a Difference
            </h2>
            <p>
              Contributing to something larger than yourself—whether through work, volunteering, creativity, or service—provides 
              a sense of significance and impact that enhances life satisfaction.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              5. Autonomy: The Freedom to Choose
            </h2>
            <p>
              Having control over your life choices and the freedom to express your authentic self is crucial for 
              satisfaction. Autonomy enables you to align your actions with your values and preferences.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              6. Health: The Foundation of Well-Being
            </h2>
            <p>
              Physical and mental health form the foundation that enables all other elements. Without health, it's 
              difficult to fully engage with purpose, relationships, growth, and contribution.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              7. Joy: The Spice of Life
            </h2>
            <p>
              Regular positive experiences, moments of pleasure, and activities that bring joy add vibrancy to life. 
              These don't need to be grand—small, consistent sources of joy contribute significantly to overall satisfaction.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the 7 elements of a satisfying life?
                </h3>
                <p>
                  The seven elements are: purpose (meaning and direction), relationships (deep connections), growth 
                  (continuous development), contribution (making a difference), autonomy (freedom and control), health 
                  (physical and mental well-being), and joy (regular positive experiences).
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Building Your Satisfying Life
            </h2>
            <p>
              A truly satisfying life isn't about perfection in any single area—it's about cultivating all seven 
              elements in ways that align with your values and circumstances. Regularly assess and nurture each 
              dimension, recognizing that they're interconnected and that progress in one area often supports growth 
              in others.
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

