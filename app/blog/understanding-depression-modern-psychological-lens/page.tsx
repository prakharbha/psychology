import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Understanding Depression Through a Modern Psychological Lens | Depression Psychology',
  description: 'Explore modern psychological understanding of depression: beyond sadness, cognitive patterns, biological factors, and evidence-based approaches to understanding and managing depression.',
  keywords: 'depression, depression psychology, understanding depression, mental health, depression symptoms, cognitive behavioral therapy, depression treatment, mood disorders',
  openGraph: {
    title: 'Understanding Depression Through a Modern Psychological Lens',
    description: 'Explore modern psychological understanding of depression and evidence-based approaches.',
    type: 'article',
    publishedTime: '2025-02-02T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
        width: 1200,
        height: 630,
        alt: 'Understanding depression through a modern psychological lens: beyond sadness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understanding Depression Through a Modern Psychological Lens',
    description: 'Explore modern psychological understanding of depression.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg'],
  },
  alternates: {
    canonical: '/blog/understanding-depression-modern-psychological-lens',
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
    headline: 'Understanding Depression Through a Modern Psychological Lens',
    description: 'Explore modern psychological understanding of depression and evidence-based approaches.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
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
      { '@type': 'ListItem', position: 3, name: 'Understanding Depression', item: 'https://www.prakharpsychologicaltest.com/blog/understanding-depression-modern-psychological-lens' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is depression from a psychological perspective?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From a modern psychological perspective, depression is understood as a complex condition involving emotional, cognitive, behavioral, and biological factors. It\'s characterized by persistent sadness or loss of interest, negative thought patterns, changes in behavior and energy, and often involves biological factors like neurotransmitter imbalances. Modern psychology views depression as more than just sadness—it\'s a comprehensive disruption of mood, thinking, and functioning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is depression different from sadness?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sadness is a normal emotional response to difficult situations that typically resolves as circumstances change. Depression is a persistent condition that lasts for weeks or months, involves multiple symptoms beyond sadness (loss of interest, energy changes, cognitive symptoms), significantly impairs functioning, and may not have an obvious trigger. Depression is a clinical condition requiring professional attention, while sadness is a normal human emotion.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Understanding Depression</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Understanding Depression Through a Modern Psychological Lens
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-02-02">February 2, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg" 
                alt="Understanding depression through a modern psychological lens: beyond sadness"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Depression is one of the most misunderstood mental health conditions. Popular conceptions often reduce it 
              to "feeling sad" or "being negative," but modern psychological understanding reveals a far more complex 
              picture. Depression involves intricate interactions between cognitive patterns, emotional regulation, 
              biological factors, and environmental influences. Understanding depression through contemporary 
              psychological frameworks provides crucial insights for recognition, treatment, and support.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Beyond Sadness: The Multidimensional Nature of Depression
            </h2>
            <p>
              Modern psychology recognizes depression as a comprehensive condition affecting multiple dimensions of 
              human experience, not just mood.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Dimension</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Manifestations</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Emotional</td>
                    <td className="border border-slate-300 px-4 py-3">Persistent sadness, loss of interest, emptiness</td>
                    <td className="border border-slate-300 px-4 py-3">Reduced capacity for pleasure and engagement</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Cognitive</td>
                    <td className="border border-slate-300 px-4 py-3">Negative thoughts, difficulty concentrating, memory issues</td>
                    <td className="border border-slate-300 px-4 py-3">Impaired decision-making and problem-solving</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Behavioral</td>
                    <td className="border border-slate-300 px-4 py-3">Withdrawal, reduced activity, changes in sleep/appetite</td>
                    <td className="border border-slate-300 px-4 py-3">Decreased functioning and engagement</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Biological</td>
                    <td className="border border-slate-300 px-4 py-3">Energy changes, physical symptoms, neurotransmitter imbalances</td>
                    <td className="border border-slate-300 px-4 py-3">Physical health impacts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Cognitive Patterns: The Depression Mindset
            </h2>
            <p>
              Cognitive-behavioral models of depression identify characteristic thinking patterns that maintain and 
              exacerbate depressive states: negative automatic thoughts, cognitive distortions, and depressive schemas.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Biological Dimension: Beyond "Chemical Imbalance"
            </h2>
            <p>
              While neurotransmitter imbalances play a role, modern understanding recognizes that depression involves 
              complex biological processes including neuroplasticity, inflammation, and genetic factors interacting 
              with environmental triggers.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What is depression from a psychological perspective?
                </h3>
                <p>
                  From a modern psychological perspective, depression is understood as a complex condition involving 
                  emotional, cognitive, behavioral, and biological factors. It's characterized by persistent sadness or 
                  loss of interest, negative thought patterns, changes in behavior and energy, and often involves 
                  biological factors like neurotransmitter imbalances. Modern psychology views depression as more than 
                  just sadness—it's a comprehensive disruption of mood, thinking, and functioning.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How is depression different from sadness?
                </h3>
                <p>
                  Sadness is a normal emotional response to difficult situations that typically resolves as circumstances 
                  change. Depression is a persistent condition that lasts for weeks or months, involves multiple symptoms 
                  beyond sadness (loss of interest, energy changes, cognitive symptoms), significantly impairs functioning, 
                  and may not have an obvious trigger. Depression is a clinical condition requiring professional attention, 
                  while sadness is a normal human emotion.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: A Comprehensive Understanding
            </h2>
            <p>
              Understanding depression through modern psychological frameworks reveals its complexity and provides 
              pathways for effective intervention. By recognizing depression as a multidimensional condition involving 
              cognitive, emotional, behavioral, and biological factors, we can develop more comprehensive approaches 
              to treatment and support that address the full scope of the condition.
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

