import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Introvert or Extrovert? Understanding Your Personality Type | Complete Guide',
  description: 'Discover the differences between introversion and extroversion, understand where you fall on the spectrum, and learn how to leverage your personality type for success and well-being.',
  keywords: 'introvert, extrovert, personality type, introversion, extroversion, personality psychology, Myers-Briggs, personality assessment, ambivert',
  openGraph: {
    title: 'Introvert or Extrovert? Understanding Your Personality Type',
    description: 'Discover the differences between introversion and extroversion and learn how to leverage your personality type.',
    type: 'article',
    publishedTime: '2025-09-30T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg',
        width: 1200,
        height: 630,
        alt: 'Understanding introversion and extroversion personality types',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Introvert or Extrovert? Understanding Your Personality Type',
    description: 'Discover the differences between introversion and extroversion.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg'],
  },
  alternates: {
    canonical: '/blog/introvert-or-extrovert-personality-type',
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
    headline: 'Introvert or Extrovert? Understanding Your Personality Type',
    description: 'Discover the differences between introversion and extroversion and learn how to leverage your personality type for success.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg',
    datePublished: '2025-09-30T00:00:00Z',
    dateModified: '2025-09-30T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Introvert or Extrovert', item: 'https://www.prakharpsychologicaltest.com/blog/introvert-or-extrovert-personality-type' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between introvert and extrovert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Introverts gain energy from solitude and internal reflection, while extroverts gain energy from social interaction and external stimulation. Introverts prefer deeper, one-on-one conversations and need time alone to recharge, whereas extroverts thrive in group settings and feel energized by social activities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you be both introvert and extrovert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, most people fall somewhere in the middle of the introversion-extroversion spectrum. These individuals are called ambiverts and can display characteristics of both types depending on the situation, context, or their current energy levels.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Introvert or Extrovert</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Introvert or Extrovert? Understanding Your Personality Type
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-18">January 18, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-personality-types.jpg" 
                alt="Understanding introversion and extroversion personality types and where you fall on the spectrum"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              The introvert-extrovert distinction is one of psychology's most recognized personality concepts, yet it's 
              also one of the most misunderstood. Many people assume introverts are simply shy extroverts, or that 
              extroverts can't enjoy quiet time. The reality is far more nuanced—and understanding where you fall on 
              this spectrum can transform how you approach work, relationships, and personal growth.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Beyond the Myths: What Introversion and Extroversion Really Mean
            </h2>
            <p>
              Carl Jung first introduced these concepts in the 1920s, but they've evolved significantly through decades 
              of research. At its core, the introversion-extroversion dimension describes where you draw your energy from 
              and how you process the world around you.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Aspect</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Introvert</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Extrovert</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Energy Source</td>
                    <td className="border border-slate-300 px-4 py-3">Internal reflection, solitude</td>
                    <td className="border border-slate-300 px-4 py-3">Social interaction, external stimulation</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Social Preference</td>
                    <td className="border border-slate-300 px-4 py-3">Small groups, deep conversations</td>
                    <td className="border border-slate-300 px-4 py-3">Large groups, varied interactions</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Processing Style</td>
                    <td className="border border-slate-300 px-4 py-3">Think before speaking, internal processing</td>
                    <td className="border border-slate-300 px-4 py-3">Think while speaking, external processing</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Recharge Method</td>
                    <td className="border border-slate-300 px-4 py-3">Time alone, quiet activities</td>
                    <td className="border border-slate-300 px-4 py-3">Social activities, stimulation</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Attention Focus</td>
                    <td className="border border-slate-300 px-4 py-3">Deep focus on few things</td>
                    <td className="border border-slate-300 px-4 py-3">Broad attention across many things</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Spectrum: Why Most People Are Ambiverts
            </h2>
            <p>
              Research suggests that only about 15-20% of people are strongly introverted or extroverted. The majority 
              fall somewhere in the middle—these ambiverts can adapt their behavior based on context, showing introverted 
              traits in some situations and extroverted traits in others.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Leveraging Your Type: Strategies for Success
            </h2>
            <p>
              Understanding your personality type isn't about limiting yourself—it's about working with your natural 
              tendencies to maximize effectiveness and well-being.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              For Introverts
            </h3>
            <ul>
              <li>Schedule regular quiet time to recharge</li>
              <li>Prepare for social events in advance</li>
              <li>Seek one-on-one or small group interactions</li>
              <li>Use written communication when possible</li>
              <li>Create boundaries around social obligations</li>
            </ul>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              For Extroverts
            </h3>
            <ul>
              <li>Build social activities into your routine</li>
              <li>Use collaboration and discussion for problem-solving</li>
              <li>Seek varied experiences and environments</li>
              <li>Balance social time with necessary rest</li>
              <li>Recognize when others need quiet time</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What is the difference between introvert and extrovert?
                </h3>
                <p>
                  Introverts gain energy from solitude and internal reflection, while extroverts gain energy from social 
                  interaction and external stimulation. Introverts prefer deeper, one-on-one conversations and need time 
                  alone to recharge, whereas extroverts thrive in group settings and feel energized by social activities.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  Can you be both introvert and extrovert?
                </h3>
                <p>
                  Yes, most people fall somewhere in the middle of the introversion-extroversion spectrum. These 
                  individuals are called ambiverts and can display characteristics of both types depending on the 
                  situation, context, or their current energy levels.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Embracing Your Authentic Self
            </h2>
            <p>
              Whether you're an introvert, extrovert, or ambivert, understanding your personality type provides valuable 
              insights into your needs, preferences, and natural strengths. Rather than trying to change who you are, 
              work with your type to create environments and routines that support your well-being and success.
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

