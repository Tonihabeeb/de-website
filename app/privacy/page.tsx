import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Deep Engineering',
  description: 'Learn about how Deep Engineering collects, uses, and protects your personal information.',
  keywords: 'privacy policy, data protection, personal information, Deep Engineering',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-white">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                1. Introduction
              </h2>
              <p className="text-white">
                Deep Engineering ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-medium text-white">
                Personal Information
              </h3>
              <p className="text-white">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Contact us through our website forms</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Apply for employment opportunities</li>
                <li>Register for events or webinars</li>
              </ul>
              
              <h3 className="text-xl font-medium text-white">
                Automatically Collected Information
              </h3>
              <p className="text-white">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                3. How We Use Your Information
              </h2>
              <p className="text-white">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and security threats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                4. Information Sharing
              </h2>
              <p className="text-white">
                We do not sell, trade, or otherwise transfer your personal information to third 
                parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>With service providers who assist us in operating our website</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                5. Data Security
              </h2>
              <p className="text-white">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-white">
                We use cookies and similar tracking technologies to enhance your experience on our 
                website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                7. Your Rights
              </h2>
              <p className="text-white">
                Depending on your location, you may have the following rights regarding your 
                personal information:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Access and receive a copy of your data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                8. Children's Privacy
              </h2>
              <p className="text-white">
                Our website is not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                9. International Transfers
              </h2>
              <p className="text-white">
                Your information may be transferred to and processed in countries other than your 
                own. We ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                10. Changes to This Policy
              </h2>
              <p className="text-white">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                11. Contact Us
              </h2>
              <p className="text-white">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Email:</strong> privacy@deepengineering.co<br />
                  <strong>Address:</strong> Deep Engineering, [Your Address]<br />
                  <strong>Phone:</strong> +964 750 XXX XXXX
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 