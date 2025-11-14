import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Identity Styles Explained: How You Understand Yourself | Identity Psychology',
  description: 'Explore identity styles: informational, normative, and diffuse-avoidant. Learn how different identity formation approaches influence self-understanding, decision-making, and psychological well-being.',
  keywords: 'identity styles, identity formation, self-concept, identity development, identity psychology, personal identity, identity crisis, self-understanding',
  openGraph: {
    title: 'Identity Styles Explained: How You Understand Yourself',
    description: 'Explore identity styles and how different approaches to identity formation influence self-understanding.',
    type: 'article',
    publishedTime: '2025-03-19T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg',
        width: 1200,
        height: 630,
        alt: 'Identity styles explained: how you understand yourself through different identity formation approaches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Identity Styles Explained: How You Understand Yourself',
    description: 'Explore identity styles and identity formation approaches.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg'],
  },
  alternates: {
    canonical: '/blog/identity-styles-explained',
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
    headline: 'Identity Styles Explained: How You Understand Yourself',
    description: 'Explore identity styles and how different approaches to identity formation influence self-understanding.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-personality-types.jpg',
    datePublished: '2025-03-19T00:00:00Z',
    dateModified: '2025-03-19T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Identity Styles Explained', item: 'https://www.prakharpsychologicaltest.com/blog/identity-styles-explained' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three identity styles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The three identity styles are: informational (actively exploring options and making commitments based on personal evaluation), normative (adopting values and goals from significant others without much exploration), and diffuse-avoidant (avoiding identity exploration and commitments, going with the flow). Each style represents a different approach to forming a sense of self.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can identity styles change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, identity styles can evolve, particularly during significant life transitions or through intentional self-reflection. Many people move from diffuse-avoidant or normative styles toward informational styles as they mature and gain life experience. However, style changes typically occur gradually and may require conscious effort and support.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Identity Styles Explained</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Identity Styles Explained: How You Understand Yourself
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-31">January 31, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-personality-types.jpg" 
                alt="Identity styles explained: how you understand yourself through different identity formation approaches"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              How do you come to understand who you are? The process of identity formation—developing a coherent sense 
              of self—varies dramatically between individuals. James Marcia's identity status model identifies distinct 
              "identity styles" that describe different approaches to exploring and committing to personal values, goals, 
              and roles. Understanding your identity style provides insights into how you make sense of yourself and 
              navigate life decisions.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Three Identity Styles: Different Paths to Self-Understanding
            </h2>
            <p>
              Identity styles are determined by two dimensions: exploration (actively seeking information and 
              considering options) and commitment (making firm decisions about values, goals, and roles). The 
              combination of these dimensions creates distinct identity formation approaches.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Identity Style</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Exploration</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Commitment</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Characteristics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Informational</td>
                    <td className="border border-slate-300 px-4 py-3">High - actively explores</td>
                    <td className="border border-slate-300 px-4 py-3">High - makes firm commitments</td>
                    <td className="border border-slate-300 px-4 py-3">Self-directed, reflective, adaptive</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Normative</td>
                    <td className="border border-slate-300 px-4 py-3">Low - minimal exploration</td>
                    <td className="border border-slate-300 px-4 py-3">High - adopts others' values</td>
                    <td className="border border-slate-300 px-4 py-3">Conforming, traditional, stable</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Diffuse-Avoidant</td>
                    <td className="border border-slate-300 px-4 py-3">Low - avoids exploration</td>
                    <td className="border border-slate-300 px-4 py-3">Low - avoids commitments</td>
                    <td className="border border-slate-300 px-4 py-3">Uncertain, reactive, flexible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              1. Informational Identity Style: The Active Explorer
            </h2>
            <p>
              Individuals with an informational identity style actively explore different options, values, and roles 
              before making commitments. They seek information, reflect on experiences, and make decisions based on 
              personal evaluation rather than external pressure.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              2. Normative Identity Style: The Traditional Adopter
            </h2>
            <p>
              Those with a normative identity style adopt values, goals, and roles from significant others (parents, 
              community, culture) without extensive personal exploration. They commit early to traditional paths and 
              maintain these commitments consistently.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              3. Diffuse-Avoidant Identity Style: The Flexible Drifter
            </h2>
            <p>
              Individuals with a diffuse-avoidant style avoid identity exploration and delay commitments. They tend to 
              go with the flow, making decisions based on immediate circumstances rather than long-term values or goals.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Implications for Well-Being and Decision-Making
            </h2>
            <p>
              Each identity style has different implications for psychological well-being, decision-making effectiveness, 
              and life satisfaction. Understanding your style helps you recognize both strengths and potential areas for 
              growth.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What are the three identity styles?
                </h3>
                <p>
                  The three identity styles are: informational (actively exploring options and making commitments based 
                  on personal evaluation), normative (adopting values and goals from significant others without much 
                  exploration), and diffuse-avoidant (avoiding identity exploration and commitments, going with the 
                  flow). Each style represents a different approach to forming a sense of self.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  Can identity styles change?
                </h3>
                <p>
                  Yes, identity styles can evolve, particularly during significant life transitions or through intentional 
                  self-reflection. Many people move from diffuse-avoidant or normative styles toward informational styles 
                  as they mature and gain life experience. However, style changes typically occur gradually and may 
                  require conscious effort and support.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Understanding Your Identity Formation
            </h2>
            <p>
              Identity styles provide a framework for understanding how you approach self-discovery and decision-making. 
              By recognizing your identity style, you can better understand your strengths, potential challenges, and 
              opportunities for growth. Whether you're an active explorer, a traditional adopter, or someone who prefers 
              to go with the flow, understanding your approach to identity formation enhances self-awareness and supports 
              authentic living.
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

