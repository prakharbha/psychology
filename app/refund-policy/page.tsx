import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Prakhar Psychological Testing and Research Centre',
  description: 'Refund policy for psychological assessment tools and tests from Prakhar Psychological Testing and Research Centre.',
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

export default function RefundPolicyPage() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Refund Policy
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">1. Overview</h2>
            <p>
              At Prakhar Psychological Testing and Research Centre, we strive to ensure customer satisfaction with our 
              psychological assessment tools and tests. However, <strong>goods once sold are not returned.</strong> This 
              Refund Policy outlines our strict no-return policy and the very limited circumstances under which refunds 
              may be considered.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">2. No Return Policy</h2>
            <p>
              <strong>All sales are final.</strong> Due to the nature of our products (psychological assessment tools), 
              we have a strict no-return, no-exchange policy. Goods once sold are not returned under any circumstances, 
              except as outlined in the limited exceptions below.
            </p>
            <p className="mt-4">
              Please review your order carefully before completing the purchase. We encourage you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Read product descriptions thoroughly</li>
              <li>Check product specifications and requirements</li>
              <li>Contact us with any questions before ordering</li>
              <li>Verify your order details before payment</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">3. Limited Refund Exceptions</h2>
            <p>
              Refunds may only be considered in the following <strong>exceptional circumstances</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Wrong Product Shipped:</strong> If you receive a completely different product than what was ordered (must be reported within 48 hours of delivery)</li>
              <li><strong>Severely Defective Product:</strong> If the product is significantly damaged or defective upon arrival (must be reported within 48 hours with photographic evidence)</li>
              <li><strong>Order Cancellation:</strong> If you cancel your order before it has been processed or shipped (subject to approval)</li>
              <li><strong>Payment Processing Error:</strong> If there was a technical error in payment processing that resulted in duplicate charges</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> Even in these exceptional cases, refund approval is at our sole discretion and not 
              guaranteed. All refund requests will be reviewed on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">4. Non-Refundable Items and Situations</h2>
            <p>The following are <strong>not eligible</strong> for refunds under any circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Products that have been opened, used, or accessed</li>
              <li>Change of mind or buyer's remorse</li>
              <li>Products that do not meet your specific requirements (if product description was accurate)</li>
              <li>Incorrect order placement by the customer</li>
              <li>Shipping and handling charges</li>
              <li>Products returned after 48 hours of delivery</li>
              <li>Any product that has been damaged after delivery due to customer handling</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">5. Refund Request Timeframe</h2>
            <p>
              For the limited exceptions where refunds may be considered, requests must be submitted within 
              <strong> 48 hours</strong> of receiving the product. Requests submitted after this period will not be 
              considered under any circumstances.
            </p>
            <p className="mt-4">
              For order cancellations, requests must be made immediately after placing the order and before processing begins.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">6. How to Request a Refund</h2>
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>Contact us at <strong>prakharpsychology@gmail.com</strong> or call <strong>+91 7526008051</strong></li>
              <li>Provide your order number and reason for refund request</li>
              <li>Include photos or documentation if the product is defective or damaged</li>
              <li>Wait for our response and instructions</li>
            </ol>
            <p className="mt-4">
              We will review your request and respond within 2-3 business days. If approved, we will provide instructions 
              for returning the product (if applicable).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">7. Return Process</h2>
            <p>
              <strong>Note:</strong> As per our no-return policy, returns are generally not accepted. However, if a refund 
              is approved in exceptional circumstances, we will provide specific return instructions. In such rare cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Products must be in their original, unopened, unused condition</li>
              <li>Original packaging and all included materials must be intact</li>
              <li>Return shipping costs are the responsibility of the customer</li>
              <li>We recommend using a trackable shipping method</li>
              <li>We are not responsible for items lost or damaged during return shipping</li>
              <li>Refund will only be processed after we receive and verify the returned product</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">8. Exchange and Replacement Delivery Timeframe</h2>
            <p>
              Exchange and replacement delivery timeframe will be 7-10 days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">9. Refund Processing Time</h2>
            <p>
              Once we receive and inspect the returned product (if applicable), we will process your refund. Refunds are 
              typically processed within 5-10 business days. The refund will be issued to the original payment method used 
              for the purchase.
            </p>
            <p className="mt-4">
              <strong>Note:</strong> It may take additional time for the refund to appear in your account, depending on 
              your bank or payment provider's processing time.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">10. Partial Refunds</h2>
            <p>
              In some cases, we may issue partial refunds. This may occur if:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Only part of the order is returned</li>
              <li>The product shows signs of use or damage not covered under warranty</li>
              <li>Shipping costs need to be deducted</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">11. Cancellation Policy</h2>
            <p>
              You may cancel your order before it is shipped. To cancel, contact us immediately at 
              prakharpsychology@gmail.com with your order number. If the order has already been processed or shipped, 
              standard refund policies apply.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">12. Payment Gateway Refunds</h2>
            <p>
              For payments made through PhonePe or other payment gateways, refunds will be processed through the same 
              payment method. The refund will appear in your account according to the payment provider's processing timeline, 
              which may take 5-15 business days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">13. Dispute Resolution</h2>
            <p>
              If you are not satisfied with our refund decision, please contact us to discuss your concerns. We are committed 
              to resolving issues fairly and will work with you to find a satisfactory solution.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
            <p>
              For refund requests, questions about this policy, or assistance with returns, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Email: prakharpsychology@gmail.com</li>
              <li>Phone: +91 7526008051</li>
            </ul>
            <p className="mt-4">
              Please include your order number in all communications to help us process your request quickly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

