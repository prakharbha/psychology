import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Prakhar Psychological Testing and Research Centre',
  description: 'Shipping policy for psychological assessment tools and tests from Prakhar Psychological Testing and Research Centre.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Shipping Policy
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">1. Shipping Areas</h2>
            <p>
              We currently ship our psychological assessment tools and tests throughout India. We are working to expand 
              our shipping services to international locations. For international orders, please contact us at 
              prakharpsychology@gmail.com for shipping options and rates.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">2. Processing Time</h2>
            <p>
              Orders are typically processed within 2-3 business days after payment confirmation. Processing time may be 
              longer during peak seasons or holidays. You will receive an email notification once your order has been 
              processed and shipped.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">3. Shipping Methods and Delivery Time</h2>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 mt-4">Standard Shipping</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Delivery Time:</strong> 5-7 business days</li>
              <li><strong>Cost:</strong> Free for orders above a certain value (check at checkout)</li>
              <li><strong>Tracking:</strong> Tracking information will be provided via email</li>
            </ul>
            
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-3 mt-4">Express Shipping</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Delivery Time:</strong> 2-3 business days</li>
              <li><strong>Cost:</strong> Additional charges apply (shown at checkout)</li>
              <li><strong>Tracking:</strong> Real-time tracking available</li>
            </ul>
            
            <p className="mt-4">
              <strong>Note:</strong> Delivery times are estimates and may vary based on location, weather conditions, 
              and carrier performance. Remote areas may experience longer delivery times.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">4. Shipping Charges</h2>
            <p>
              Shipping charges are calculated based on the weight, dimensions, and destination of your order. Shipping 
              costs are displayed during checkout before you complete your purchase. We offer free shipping on orders 
              above a certain value, which will be clearly indicated during checkout.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">5. Order Tracking</h2>
            <p>
              Once your order has been shipped, you will receive an email with tracking information. You can use this 
              tracking number to monitor your shipment's progress through our shipping carrier's website. If you do not 
              receive tracking information within 5 business days of your order, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">6. Delivery Address</h2>
            <p>
              Please ensure that your delivery address is complete and accurate at the time of checkout. We are not 
              responsible for delays or failed deliveries due to incorrect or incomplete addresses. If you need to change 
              your delivery address after placing an order, please contact us immediately at prakharpsychology@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">7. Delivery Attempts</h2>
            <p>
              Our shipping carriers will typically make 2-3 delivery attempts. If delivery is unsuccessful, the package 
              may be held at a local facility for pickup. You will be notified via email or phone about the delivery 
              status. Packages unclaimed after the holding period may be returned to us, and return shipping charges 
              may apply.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">8. Damaged or Lost Packages</h2>
            <p>
              If your package arrives damaged or is lost in transit, please contact us immediately at 
              prakharpsychology@gmail.com with your order number and photos (if damaged). We will work with the shipping 
              carrier to resolve the issue.
            </p>
            <p className="mt-4">
              <strong>Note:</strong> As per our policy, goods once sold are not returned. However, in cases of damaged 
              products upon arrival, we may consider replacement or refund on a case-by-case basis, subject to verification 
              and our discretion. Please report any damage within 48 hours of delivery with photographic evidence.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">9. International Shipping</h2>
            <p>
              For international orders, additional customs duties, taxes, and fees may apply and are the responsibility 
              of the recipient. Delivery times for international orders may vary significantly. Please contact us before 
              placing an international order to confirm shipping availability and estimated costs.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">10. Undeliverable Packages</h2>
            <p>
              If a package is returned to us as undeliverable due to an incorrect address, refusal to accept, or failure 
              to pick up, we will contact you to arrange reshipment. Additional shipping charges may apply for reshipment.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> Please ensure your delivery address is correct. Goods once sold are not returned. 
              If a package is returned to us due to address issues, reshipment charges will apply.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">11. Shipping Delays</h2>
            <p>
              While we strive to deliver orders within the estimated timeframes, delays may occur due to factors beyond 
              our control, including weather, natural disasters, carrier issues, or customs processing. We will keep you 
              informed of any significant delays and work to resolve them promptly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
            <p>
              If you have questions about shipping, need to update your delivery address, or have concerns about your 
              order, please contact us:
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

