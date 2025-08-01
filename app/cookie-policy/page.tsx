import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Settings, Eye, Shield, Calendar, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy - Deep Engineering',
  description: 'Learn how Deep Engineering uses cookies and similar technologies on our website.',
  keywords: 'cookie policy, cookies, tracking, website analytics, Deep Engineering',
};

export default function CookiePolicyPage() {
  const lastUpdated = 'January 2025';

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-primary text-white py-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex justify-center mb-6'>
              <Cookie className='w-16 h-16 text-white' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Cookie Policy
            </h1>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              Learn how we use cookies and similar technologies to improve your experience on our website.
            </p>
            <div className='flex items-center justify-center gap-4 mt-6 text-sm text-white/80'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='py-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-xl shadow-lg p-8 md:p-12'>
              
              {/* Introduction */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-4'>What Are Cookies?</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and personalizing content.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  This Cookie Policy explains how Deep Engineering uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies in accordance with this policy.
                </p>
              </div>

              {/* Types of Cookies */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Settings className='w-6 h-6' />
                  Types of Cookies We Use
                </h2>
                
                <div className='space-y-6'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Essential Cookies</h3>
                    <p className='text-gray-700 mb-3'>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Authentication and security cookies</li>
                      <li>Session management cookies</li>
                      <li>Load balancing cookies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Analytics Cookies</h3>
                    <p className='text-gray-700 mb-3'>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Google Analytics cookies</li>
                      <li>Page view tracking</li>
                      <li>User behavior analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Functional Cookies</h3>
                    <p className='text-gray-700 mb-3'>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Language preference cookies</li>
                      <li>Theme and layout preferences</li>
                      <li>Form data retention</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Performance Cookies</h3>
                    <p className='text-gray-700 mb-3'>These cookies help us improve website performance and user experience by collecting information about how the website is used.</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Page load time tracking</li>
                      <li>Error monitoring</li>
                      <li>Performance optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookie Management */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Eye className='w-6 h-6' />
                  Managing Your Cookie Preferences
                </h2>
                
                <p className='text-gray-700 mb-4'>You have several options for managing cookies:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6'>
                  <li><strong>Browser Settings:</strong> You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect website functionality.</li>
                  <li><strong>Cookie Consent:</strong> When you first visit our website, you can choose which types of cookies to accept.</li>
                  <li><strong>Opt-out Tools:</strong> You can use browser extensions or tools to manage cookie preferences.</li>
                </ul>
                
                <div className='bg-blue-50 p-6 rounded-lg'>
                  <h4 className='font-semibold text-blue-800 mb-3'>How to Manage Cookies in Your Browser</h4>
                  <ul className='text-blue-700 space-y-2'>
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Third-Party Cookies</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Some cookies on our website are set by third-party services that we use to enhance functionality and analyze website usage. These third parties may also use cookies to collect information about your online activities across different websites.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  We do not control these third-party cookies, and their use is governed by the privacy policies of the respective third parties.
                </p>
              </div>

              {/* Cookie Duration */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Cookie Duration</h2>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>Session Cookies</h3>
                    <p className='text-gray-700'>These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you browse our website.</p>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>Persistent Cookies</h3>
                    <p className='text-gray-700'>These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and settings.</p>
                  </div>
                </div>
              </div>

              {/* Data Collection */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Shield className='w-6 h-6' />
                  Information Collected by Cookies
                </h2>
                
                <p className='text-gray-700 mb-4'>Cookies may collect the following types of information:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>User preferences and settings</li>
                  <li>Form data and interactions</li>
                </ul>
              </div>

              {/* Updates to Policy */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Updates to This Cookie Policy</h2>
                <p className='text-gray-700 leading-relaxed'>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                </p>
              </div>

              {/* Contact Information */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Contact Us</h2>
                <p className='text-gray-700 mb-4'>If you have any questions about our use of cookies, please contact us:</p>
                <div className='bg-gray-50 p-6 rounded-lg'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-primary' />
                      <span className='text-gray-700'>Email: privacy@deepengineering.co</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-primary' />
                      <span className='text-gray-700'>General: info@deepengineering.co</span>
                    </div>
                    <div className='text-gray-700'>
                      <strong>Address:</strong><br />
                      Deep Engineering<br />
                      Roya Tower A 1-14, Erbil-44001, Iraq
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Home */}
              <div className='text-center pt-8 border-t border-gray-200'>
                <Link
                  href='/'
                  className='inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors'
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 