import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Prakhar Psychological Testing and Research Centre',
  description: 'Terms and conditions for purchasing psychological assessment tools and tests from Prakhar Psychological Testing and Research Centre.',
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Terms and Conditions
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website and purchasing products from Prakhar Psychological Testing and Research Centre, 
              you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, 
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">2. Products and Services</h2>
            <p>
              We provide psychological assessment tools, tests, and inventories for professionals in research, clinical practice, 
              and education. All products are validated, culturally adapted, and available in multiple languages as specified 
              in the product descriptions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">3. Ordering and Payment</h2>
            <p>
              When you place an order, you are making an offer to purchase products at the prices listed. We reserve the right 
              to accept or reject your order. Payment must be made in full before products are shipped. We accept payments 
              through PhonePe and other payment methods as specified during checkout.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">4. Pricing and Availability</h2>
            <p>
              All prices are listed in Indian Rupees (INR) and are subject to change without notice. We strive to maintain 
              accurate pricing, but errors may occur. We reserve the right to correct any pricing errors and cancel orders 
              placed at incorrect prices. Product availability is subject to change.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">5. Shipping and Delivery</h2>
            <p>
              Products will be shipped to the address provided during checkout. Delivery times may vary based on location and 
              shipping method selected. We are not responsible for delays caused by shipping carriers or customs. Please refer 
              to our Shipping Policy for detailed information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">6. Returns and Refunds</h2>
            <p>
              <strong>Goods once sold are not returned.</strong> Due to the nature of our products (psychological assessment 
              tools), we have a strict no-return policy. All sales are final once the order has been confirmed and payment 
              has been processed.
            </p>
            <p className="mt-4">
              Refunds may only be considered in exceptional circumstances, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Product received is significantly different from what was ordered</li>
              <li>Product is defective or damaged upon arrival (must be reported within 48 hours)</li>
              <li>Order was cancelled before processing/shipment</li>
            </ul>
            <p className="mt-4">
              Please review your order carefully before completing the purchase. For any concerns, contact us at 
              prakharpsychology@gmail.com before placing your order.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
            <p>
              All products, content, and materials on this website are protected by copyright and intellectual property laws. 
              Products are licensed for use as specified in the product documentation. Unauthorized reproduction, distribution, 
              or sharing of products is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">8. Use of Products</h2>
            <p>
              Our psychological assessment tools are intended for use by qualified professionals in appropriate settings. 
              Users are responsible for ensuring they have the necessary qualifications and training to use these tools 
              appropriately and ethically.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
            <p>
              Prakhar Psychological Testing and Research Centre shall not be liable for any indirect, incidental, special, 
              or consequential damages arising from the use of our products or services. Our liability is limited to the 
              purchase price of the product.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">10. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and 
              protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately 
              upon posting on this website. Your continued use of our services after changes are posted constitutes your 
              acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
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

