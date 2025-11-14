import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 Dimensions of Mental Health Everyone Should Understand | Complete Guide',
  description: 'Explore the five essential dimensions of mental health: emotional, psychological, social, spiritual, and physical. Learn how they interconnect and impact overall well-being.',
  keywords: 'mental health dimensions, emotional health, psychological well-being, social health, spiritual wellness, mental wellness, holistic health, mental health awareness',
  openGraph: {
    title: '5 Dimensions of Mental Health Everyone Should Understand',
    description: 'Explore the five essential dimensions of mental health and learn how they interconnect to impact overall well-being.',
    type: 'article',
    publishedTime: '2025-01-16T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
        width: 1200,
        height: 630,
        alt: 'Five dimensions of mental health: emotional, psychological, social, spiritual, and physical',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 Dimensions of Mental Health Everyone Should Understand',
    description: 'Explore the five essential dimensions of mental health and their impact on well-being.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg'],
  },
  alternates: {
    canonical: '/blog/5-dimensions-mental-health',
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
    headline: '5 Dimensions of Mental Health Everyone Should Understand',
    description: 'Explore the five essential dimensions of mental health: emotional, psychological, social, spiritual, and physical.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
    datePublished: '2025-01-16T00:00:00Z',
    dateModified: '2025-01-16T00:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Prakhar Psychological Testing',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: '5 Dimensions of Mental Health', item: 'https://www.prakharpsychologicaltest.com/blog/5-dimensions-mental-health' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the 5 dimensions of mental health?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The five dimensions of mental health are: emotional (managing feelings), psychological (cognitive functioning), social (relationships and community), spiritual (meaning and purpose), and physical (body-mind connection). Each dimension influences and is influenced by the others.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do the dimensions of mental health interact?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dimensions are interconnected—improving one often positively impacts others. For example, regular exercise (physical) can improve mood (emotional) and reduce anxiety (psychological), while strong relationships (social) can provide meaning (spiritual) and support.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">5 Dimensions of Mental Health</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              5 Dimensions of Mental Health Everyone Should Understand
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-16">January 16, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg" 
                alt="Five dimensions of mental health: emotional, psychological, social, spiritual, and physical well-being"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Mental health isn't a single, monolithic concept—it's a complex, multidimensional system that influences 
              every aspect of our lives. Understanding these dimensions helps us recognize that well-being extends far 
              beyond the absence of mental illness. True mental health involves thriving across multiple interconnected 
              domains, each contributing to our overall sense of fulfillment and capability.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Five Dimensions: A Holistic Framework
            </h2>
            <p>
              Contemporary psychological research identifies five core dimensions that collectively determine mental health. 
              These aren't separate silos but interconnected systems that continuously influence each other.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Dimension</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Key Components</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Indicators of Health</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Emotional</td>
                    <td className="border border-slate-300 px-4 py-3">Emotion regulation, self-awareness, resilience</td>
                    <td className="border border-slate-300 px-4 py-3">Ability to experience and express emotions appropriately</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Psychological</td>
                    <td className="border border-slate-300 px-4 py-3">Cognitive functioning, problem-solving, self-esteem</td>
                    <td className="border border-slate-300 px-4 py-3">Clear thinking, effective decision-making, positive self-view</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Social</td>
                    <td className="border border-slate-300 px-4 py-3">Relationships, communication, community involvement</td>
                    <td className="border border-slate-300 px-4 py-3">Meaningful connections, social support, belonging</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Spiritual</td>
                    <td className="border border-slate-300 px-4 py-3">Purpose, values, meaning-making, transcendence</td>
                    <td className="border border-slate-300 px-4 py-3">Sense of purpose, alignment with values, inner peace</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Physical</td>
                    <td className="border border-slate-300 px-4 py-3">Sleep, nutrition, exercise, body awareness</td>
                    <td className="border border-slate-300 px-4 py-3">Energy levels, physical comfort, body-mind connection</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              1. Emotional Dimension: The Foundation of Feeling
            </h2>
            <p>
              The emotional dimension encompasses our ability to recognize, understand, express, and manage our feelings. 
              It's not about eliminating difficult emotions but developing the capacity to experience the full range of 
              human emotions while maintaining stability and resilience.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              Key Characteristics of Emotional Health
            </h3>
            <ul>
              <li>Emotional awareness and vocabulary</li>
              <li>Ability to regulate intense emotions</li>
              <li>Comfort with emotional expression</li>
              <li>Resilience in the face of emotional challenges</li>
              <li>Empathy and emotional connection with others</li>
            </ul>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              2. Psychological Dimension: The Mind's Capacity
            </h2>
            <p>
              This dimension focuses on cognitive functioning, mental clarity, and psychological resources. It includes 
              how we think, process information, solve problems, and maintain a healthy sense of self.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              3. Social Dimension: Connection and Community
            </h2>
            <p>
              Humans are inherently social beings, and our mental health is deeply influenced by the quality of our 
              relationships and our sense of belonging within communities.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              4. Spiritual Dimension: Meaning and Purpose
            </h2>
            <p>
              The spiritual dimension isn't necessarily about religion—it's about having a sense of meaning, purpose, 
              and connection to something larger than oneself.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              5. Physical Dimension: The Body-Mind Connection
            </h2>
            <p>
              The physical dimension recognizes that mental and physical health are inseparable. How we care for our 
              bodies directly impacts our mental well-being.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              How the Dimensions Interconnect
            </h2>
            <p>
              These dimensions don't exist in isolation. They form a dynamic system where changes in one area ripple 
              through others. Understanding these connections helps us develop more effective strategies for mental 
              health maintenance and improvement.
            </p>

            <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">Example: The Exercise Effect</h3>
              <p>
                Regular exercise (physical dimension) releases endorphins that improve mood (emotional), enhances 
                cognitive function (psychological), provides opportunities for social connection (social), and can 
                create a sense of accomplishment and purpose (spiritual). One intervention touches all five dimensions.
              </p>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the 5 dimensions of mental health?
                </h3>
                <p>
                  The five dimensions of mental health are: emotional (managing feelings), psychological (cognitive 
                  functioning), social (relationships and community), spiritual (meaning and purpose), and physical 
                  (body-mind connection). Each dimension influences and is influenced by the others.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  How do the dimensions of mental health interact?
                </h3>
                <p>
                  The dimensions are interconnected—improving one often positively impacts others. For example, regular 
                  exercise (physical) can improve mood (emotional) and reduce anxiety (psychological), while strong 
                  relationships (social) can provide meaning (spiritual) and support.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: A Holistic Approach to Mental Health
            </h2>
            <p>
              Understanding these five dimensions provides a comprehensive framework for mental health. Rather than 
              focusing on a single area, we can develop strategies that address multiple dimensions simultaneously, 
              creating synergistic effects that enhance overall well-being.
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

