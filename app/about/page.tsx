export const metadata = {
  title: 'About Us - Prakhar Psychological Testing',
  description: 'Learn about Prakhar Psychological Testing and Research Centre',
};

export default function AboutPage() {
  return (
    <div className="bg-white relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floral animated background */}
      <div className="floral-banner-bg absolute inset-0 pointer-events-none">
        <div className="floral-orb-banner floral-orb-banner-1"></div>
        <div className="floral-orb-banner floral-orb-banner-2"></div>
        <div className="floral-orb-banner floral-orb-banner-3"></div>
        <div className="floral-orb-banner floral-orb-banner-4"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">
          About Us
        </h1>

        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Prakhar Psychological Testing and Research Centre is dedicated to providing 
              high-quality psychological assessment tools for professionals in research, 
              clinical practice, and educational institutions. We strive to make validated, 
              culturally adapted psychological tests accessible to practitioners across India.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <ul className="space-y-4 text-lg text-slate-700">
              <li className="flex items-start">
                <span className="text-slate-900 font-bold mr-3">•</span>
                <span>Commitment to quality and scientific rigor in all our assessments</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-900 font-bold mr-3">•</span>
                <span>Cultural sensitivity and adaptation of tests for Indian populations</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-900 font-bold mr-3">•</span>
                <span>Accessibility and affordability for professionals across sectors</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-900 font-bold mr-3">•</span>
                <span>Continuous research and development of new assessment tools</span>
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              We offer a comprehensive range of psychological tests covering various domains 
              including personality assessment, mental health evaluation, stress and anxiety 
              measurement, and specialized scales for academic and organizational settings. 
              All our tests are available in bilingual (Hindi-English) format, with some 
              exclusively in Hindi, ensuring wide accessibility across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

