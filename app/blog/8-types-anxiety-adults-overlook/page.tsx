import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '8 Types of Anxiety Adults Commonly Overlook | Anxiety Awareness',
  description: 'Discover 8 types of anxiety that adults often overlook: perfectionism anxiety, decision anxiety, social comparison anxiety, and more. Learn to recognize and address these hidden anxiety patterns.',
  keywords: 'anxiety types, adult anxiety, hidden anxiety, anxiety awareness, anxiety symptoms, anxiety disorders, mental health, anxiety management',
  openGraph: {
    title: '8 Types of Anxiety Adults Commonly Overlook',
    description: 'Discover 8 types of anxiety that adults often overlook and learn to recognize these hidden patterns.',
    type: 'article',
    publishedTime: '2025-02-01T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-student-stress.jpg',
        width: 1200,
        height: 630,
        alt: '8 types of anxiety that adults commonly overlook in daily life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '8 Types of Anxiety Adults Commonly Overlook',
    description: 'Discover 8 types of anxiety that adults often overlook.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-student-stress.jpg'],
  },
  alternates: {
    canonical: '/blog/8-types-anxiety-adults-overlook',
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
    headline: '8 Types of Anxiety Adults Commonly Overlook',
    description: 'Discover 8 types of anxiety that adults often overlook and learn to recognize these hidden patterns.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-student-stress.jpg',
    datePublished: '2025-02-01T00:00:00Z',
    dateModified: '2025-02-01T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: '8 Types of Anxiety', item: 'https://www.prakharpsychologicaltest.com/blog/8-types-anxiety-adults-overlook' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are some overlooked types of anxiety in adults?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commonly overlooked anxiety types include: perfectionism anxiety (fear of making mistakes), decision anxiety (paralysis when choosing), social comparison anxiety (constant comparison with others), future anxiety (worry about what\'s ahead), performance anxiety (fear of evaluation), relationship anxiety (fear of abandonment or conflict), health anxiety (excessive worry about health), and achievement anxiety (pressure to succeed). These often go unrecognized because they\'re normalized or masked as "normal" stress.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I recognize hidden anxiety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hidden anxiety often manifests as: excessive worry that feels "normal," avoidance behaviors, physical symptoms (tension, headaches, sleep issues), perfectionism or procrastination, difficulty making decisions, constant comparison with others, or feeling overwhelmed by routine tasks. If these patterns interfere with daily functioning or well-being, they may indicate anxiety that needs attention.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">8 Types of Anxiety</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              8 Types of Anxiety Adults Commonly Overlook
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-02-01">February 1, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-student-stress.jpg" 
                alt="8 types of anxiety that adults commonly overlook in daily life"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Anxiety doesn't always announce itself with panic attacks or obvious symptoms. Many adults live with 
              subtle, persistent forms of anxiety that go unrecognized because they're normalized, masked as "normal" 
              stress, or manifest in ways that don't fit traditional anxiety stereotypes. These hidden anxiety patterns 
              can significantly impact well-being and functioning while remaining invisible to both the individual and 
              those around them.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Hidden Anxiety Spectrum
            </h2>
            <p>
              These overlooked anxiety types often operate beneath conscious awareness, integrated into daily life as 
              "just how things are" rather than recognized as anxiety patterns requiring attention.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Anxiety Type</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Common Manifestations</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Why It's Overlooked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Perfectionism Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Fear of mistakes, excessive checking, procrastination</td>
                    <td className="border border-slate-300 px-4 py-3">Seen as "high standards" or "being thorough"</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Decision Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Paralysis when choosing, excessive research, regret</td>
                    <td className="border border-slate-300 px-4 py-3">Attributed to being "thoughtful" or "careful"</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Social Comparison Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Constant comparison, imposter syndrome, FOMO</td>
                    <td className="border border-slate-300 px-4 py-3">Normalized in competitive cultures</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Future Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Excessive planning, worry about what's ahead</td>
                    <td className="border border-slate-300 px-4 py-3">Seen as "being prepared" or "responsible"</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Performance Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Fear of evaluation, stage fright, work stress</td>
                    <td className="border border-slate-300 px-4 py-3">Attributed to "caring about quality"</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Relationship Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Fear of abandonment, conflict avoidance, people-pleasing</td>
                    <td className="border border-slate-300 px-4 py-3">Seen as "being considerate" or "nice"</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Health Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Excessive worry about health, symptom checking</td>
                    <td className="border border-slate-300 px-4 py-3">Attributed to "being health-conscious"</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Achievement Anxiety</td>
                    <td className="border border-slate-300 px-4 py-3">Pressure to succeed, fear of failure, burnout</td>
                    <td className="border border-slate-300 px-4 py-3">Normalized as "ambition" or "drive"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Recognizing Hidden Anxiety: Key Indicators
            </h2>
            <p>
              Hidden anxiety often manifests through patterns that seem normal or even positive but actually reflect 
              underlying anxiety.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Addressing Overlooked Anxiety
            </h2>
            <p>
              The first step in addressing hidden anxiety is recognition. Once identified, these anxiety patterns can be 
              managed through various evidence-based strategies.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are some overlooked types of anxiety in adults?
                </h3>
                <p>
                  Commonly overlooked anxiety types include: perfectionism anxiety (fear of making mistakes), decision 
                  anxiety (paralysis when choosing), social comparison anxiety (constant comparison with others), future 
                  anxiety (worry about what's ahead), performance anxiety (fear of evaluation), relationship anxiety 
                  (fear of abandonment or conflict), health anxiety (excessive worry about health), and achievement 
                  anxiety (pressure to succeed). These often go unrecognized because they're normalized or masked as 
                  "normal" stress.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How can I recognize hidden anxiety?
                </h3>
                <p>
                  Hidden anxiety often manifests as: excessive worry that feels "normal," avoidance behaviors, physical 
                  symptoms (tension, headaches, sleep issues), perfectionism or procrastination, difficulty making 
                  decisions, constant comparison with others, or feeling overwhelmed by routine tasks. If these patterns 
                  interfere with daily functioning or well-being, they may indicate anxiety that needs attention.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Making the Invisible Visible
            </h2>
            <p>
              Recognizing overlooked anxiety types is the first step toward addressing them. By understanding how anxiety 
              can manifest in subtle, normalized ways, adults can identify patterns that may be impacting their 
              well-being and seek appropriate support. Anxiety doesn't have to be obvious to be real—and recognizing 
              hidden anxiety patterns enables more effective management and improved quality of life.
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

