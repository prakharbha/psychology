import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Science of Personal Well-Being: A Complete Guide | Evidence-Based Insights',
  description: 'Explore the science behind personal well-being: psychological research, evidence-based practices, and actionable strategies for enhancing life satisfaction and mental health.',
  keywords: 'personal well-being, well-being science, positive psychology, life satisfaction, mental health, happiness research, well-being strategies, psychological wellness',
  openGraph: {
    title: 'The Science of Personal Well-Being: A Complete Guide',
    description: 'Explore the science behind personal well-being and evidence-based strategies for enhancing life satisfaction.',
    type: 'article',
    publishedTime: '2025-07-02T00:00:00Z',
    authors: ['Prakhar Psychological Testing'],
    images: [
      {
        url: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
        width: 1200,
        height: 630,
        alt: 'The science of personal well-being: evidence-based insights and strategies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Science of Personal Well-Being: A Complete Guide',
    description: 'Explore the science behind personal well-being.',
    images: ['https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg'],
  },
  alternates: {
    canonical: '/blog/science-personal-wellbeing-complete-guide',
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
    headline: 'The Science of Personal Well-Being: A Complete Guide',
    description: 'Explore the science behind personal well-being and evidence-based strategies.',
    image: 'https://www.prakharpsychologicaltest.com/images/blog/prakhar-psychological-testing-wellbeing.jpg',
    datePublished: '2025-07-02T00:00:00Z',
    dateModified: '2025-07-02T00:00:00Z',
    author: { '@type': 'Organization', name: 'Prakhar Psychological Testing' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prakharpsychologicaltest.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.prakharpsychologicaltest.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Science of Personal Well-Being', item: 'https://www.prakharpsychologicaltest.com/blog/science-personal-wellbeing-complete-guide' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is personal well-being?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Personal well-being encompasses multiple dimensions including emotional health (managing feelings effectively), psychological health (cognitive functioning and self-concept), social health (relationships and belonging), physical health (body-mind connection), and spiritual health (meaning and purpose). It\'s a holistic state of thriving across these interconnected domains.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can well-being be improved?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research consistently shows that well-being can be enhanced through intentional practices. Evidence-based strategies include gratitude exercises, mindfulness meditation, regular exercise, strong social connections, meaningful activities, goal-setting, and professional support when needed. Well-being is both a state and a skill that can be developed.',
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
            <Link href="/" className="hover:text-dark-blue-700">Home</Link> / <Link href="/blog" className="hover:text-dark-blue-700">Blog</Link> / <span className="text-slate-900">Science of Personal Well-Being</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The Science of Personal Well-Being: A Complete Guide
            </h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span>By Prakhar Psychological Testing</span>
              <span>•</span>
              <time dateTime="2025-01-24">January 24, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src="/images/blog/prakhar-psychological-testing-wellbeing.jpg" 
                alt="The science of personal well-being: evidence-based insights and strategies"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              Well-being isn't just the absence of illness—it's a positive state of thriving across multiple dimensions 
              of human experience. Over the past few decades, psychological science has moved beyond simply treating 
              dysfunction to understanding and promoting optimal functioning. This shift has revealed evidence-based 
              insights about what truly contributes to personal well-being and how we can intentionally cultivate it.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Understanding Well-Being: Beyond Happiness
            </h2>
            <p>
              Well-being is a multidimensional construct that encompasses more than momentary happiness. It includes 
              hedonic well-being (pleasure and positive emotions) and eudaimonic well-being (meaning, purpose, and 
              personal growth). Both dimensions are important and contribute to overall life satisfaction.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Well-Being Dimension</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Key Components</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Research Support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Emotional</td>
                    <td className="border border-slate-300 px-4 py-3">Positive emotions, emotion regulation</td>
                    <td className="border border-slate-300 px-4 py-3">Strong - predicts life satisfaction</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Psychological</td>
                    <td className="border border-slate-300 px-4 py-3">Self-acceptance, personal growth, autonomy</td>
                    <td className="border border-slate-300 px-4 py-3">Strong - core to eudaimonic well-being</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Social</td>
                    <td className="border border-slate-300 px-4 py-3">Relationships, belonging, support</td>
                    <td className="border border-slate-300 px-4 py-3">Very Strong - strongest predictor</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Physical</td>
                    <td className="border border-slate-300 px-4 py-3">Health, energy, body-mind connection</td>
                    <td className="border border-slate-300 px-4 py-3">Strong - foundation for other dimensions</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-semibold">Spiritual</td>
                    <td className="border border-slate-300 px-4 py-3">Meaning, purpose, transcendence</td>
                    <td className="border border-slate-300 px-4 py-3">Moderate-Strong - varies by individual</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Evidence-Based Practices for Enhancing Well-Being
            </h2>
            <p>
              Research has identified specific practices that reliably enhance well-being when implemented consistently. 
              These aren't quick fixes but sustainable habits that create lasting positive change.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              1. Gratitude Practices
            </h3>
            <p>
              Regularly expressing gratitude—through journaling, reflection, or communication—has been shown to 
              increase positive emotions, improve relationships, and enhance overall life satisfaction.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              2. Mindfulness and Meditation
            </h3>
            <p>
              Mindfulness practices reduce stress, improve emotional regulation, enhance self-awareness, and contribute 
              to both hedonic and eudaimonic well-being.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              3. Regular Physical Activity
            </h3>
            <p>
              Exercise releases endorphins, reduces anxiety and depression, improves sleep, and enhances cognitive 
              function—all contributing to well-being.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              4. Strong Social Connections
            </h3>
            <p>
              Investing in meaningful relationships provides emotional support, reduces loneliness, and creates a sense 
              of belonging—all critical for well-being.
            </p>

            <h3 className="font-heading text-2xl font-semibold text-slate-900 mt-8 mb-4">
              5. Meaningful Activities
            </h3>
            <p>
              Engaging in activities that align with your values and provide a sense of purpose enhances eudaimonic 
              well-being and life satisfaction.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Well-Being Set Point: Can We Change It?
            </h2>
            <p>
              Research suggests that individuals have a baseline level of well-being influenced by genetics and 
              personality, but this set point isn't fixed. Intentional practices can shift baseline well-being over time, 
              though the process requires consistent effort.
            </p>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 my-8">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  What is personal well-being?
                </h3>
                <p>
                  Personal well-being encompasses multiple dimensions including emotional health (managing feelings 
                  effectively), psychological health (cognitive functioning and self-concept), social health 
                  (relationships and belonging), physical health (body-mind connection), and spiritual health (meaning 
                  and purpose). It's a holistic state of thriving across these interconnected domains.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3">
                  Can well-being be improved?
                </h3>
                <p>
                  Yes, research consistently shows that well-being can be enhanced through intentional practices. 
                  Evidence-based strategies include gratitude exercises, mindfulness meditation, regular exercise, strong 
                  social connections, meaningful activities, goal-setting, and professional support when needed. 
                  Well-being is both a state and a skill that can be developed.
                </p>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion: Cultivating Your Well-Being
            </h2>
            <p>
              Personal well-being is both a science and an art—grounded in evidence-based practices but requiring 
              personalization to your unique circumstances, values, and preferences. By understanding the dimensions 
              of well-being and implementing proven strategies consistently, you can enhance your life satisfaction and 
              create a foundation for thriving across all areas of your life.
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

