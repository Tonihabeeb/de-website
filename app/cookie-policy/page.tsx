import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Deep Engineering',
  description: 'Learn about how Deep Engineering uses cookies and similar technologies on our website.',
  keywords: 'cookie policy, cookies, tracking, Deep Engineering',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-white">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                1. What Are Cookies?
              </h2>
              <p className="text-white">
                Cookies are small text files that are placed on your device when you visit our 
                website. They help us provide you with a better experience by remembering your 
                preferences and analyzing how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                2. How We Use Cookies
              </h2>
              <p className="text-white">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                3. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-medium text-white">
                Essential Cookies
              </h3>
              <p className="text-white">
                These cookies are necessary for the website to function and cannot be switched 
                off in our systems. They are usually only set in response to actions made by 
                you which amount to a request for services, such as setting your privacy 
                preferences, logging in, or filling in forms.
              </p>

              <h3 className="text-xl font-medium text-white">
                Performance Cookies
              </h3>
              <p className="text-white">
                These cookies allow us to count visits and traffic sources so we can measure 
                and improve the performance of our site. They help us to know which pages are 
                the most and least popular and see how visitors move around the site.
              </p>

              <h3 className="text-xl font-medium text-white">
                Functional Cookies
              </h3>
              <p className="text-white">
                These cookies enable the website to provide enhanced functionality and 
                personalization. They may be set by us or by third-party providers whose 
                services we have added to our pages.
              </p>

              <h3 className="text-xl font-medium text-white">
                Marketing Cookies
              </h3>
              <p className="text-white">
                These cookies may be set through our site by our advertising partners. They 
                may be used by those companies to build a profile of your interests and show 
                you relevant adverts on other sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                4. Third-Party Cookies
              </h2>
              <p className="text-white">
                We may use third-party services that place cookies on your device. These 
                services include:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li><strong>Google Analytics:</strong> To analyze website traffic and usage patterns</li>
                <li><strong>Google Maps:</strong> To display interactive maps on our website</li>
                <li><strong>Social Media Platforms:</strong> For social media integration and sharing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                5. Managing Your Cookie Preferences
              </h2>
              <p className="text-white">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete them</li>
                <li><strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
                <li><strong>Third-Party Opt-Out:</strong> Visit third-party websites to opt out of their cookies</li>
              </ul>
              <p className="text-white">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                6. Cookie Duration
              </h2>
              <p className="text-white">
                Cookies on our website may be:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                7. Your Rights
              </h2>
              <p className="text-white">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Withdraw consent for non-essential cookies at any time</li>
                <li>Request information about the cookies we use</li>
                <li>Request deletion of your cookie data</li>
                <li>Lodge a complaint with relevant data protection authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                8. Updates to This Policy
              </h2>
              <p className="text-white">
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or for other operational, legal, or regulatory reasons. We will 
                notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                9. Contact Us
              </h2>
              <p className="text-white">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Email:</strong> privacy@deepengineering.co<br />
                  <strong>Address:</strong> Deep Engineering, [Your Address]<br />
                  <strong>Phone:</strong> +964 750 XXX XXXX
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                10. Cookie Consent
              </h2>
              <p className="text-white">
                By continuing to use our website, you consent to our use of cookies as 
                described in this Cookie Policy. You can withdraw your consent at any time 
                by adjusting your browser settings or using our cookie consent management tool.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 