import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Prakhar Psychological Testing and Research Centre',
  description: 'Privacy policy explaining how Prakhar Psychological Testing and Research Centre collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>
              Prakhar Psychological Testing and Research Centre ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 mt-4">Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Payment information (processed securely through payment gateways)</li>
              <li>Order history and preferences</li>
              <li>Communication records (emails, messages)</li>
            </ul>
            
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 mt-4">Automatically Collected Information</h3>
            <p>We may automatically collect certain information when you visit our website:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Website usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders and inquiries</li>
              <li>To send you important updates and notifications</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>With payment processors to complete transactions</li>
              <li>With shipping carriers to deliver your orders</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
              and personalize content. You can control cookie preferences through your browser settings, though this may 
              affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at prakharpsychology@gmail.com
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">8. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of 
              these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please contact us 
              immediately.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">11. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
              "Last updated" date. Your continued use of our services after changes are posted constitutes acceptance of 
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please 
              contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Email: prakharpsychology@gmail.com</li>
              <li>Phone: +91 7526008051</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

