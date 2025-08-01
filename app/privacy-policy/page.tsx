import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Eye, Lock, Users, Calendar, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Deep Engineering',
  description: 'Learn how Deep Engineering collects, uses, and protects your personal information in accordance with data protection regulations.',
  keywords: 'privacy policy, data protection, GDPR, personal information, Deep Engineering',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 2025';

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-primary text-white py-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex justify-center mb-6'>
              <Shield className='w-16 h-16 text-white' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Privacy Policy
            </h1>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <h2 className='text-2xl font-bold text-primary mb-4'>Introduction</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Deep Engineering ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  By using our website, you consent to the data practices described in this policy. If you do not agree with our policies and practices, please do not use our website.
                </p>
              </div>

              {/* Information We Collect */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Eye className='w-6 h-6' />
                  Information We Collect
                </h2>
                
                <div className='space-y-6'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Personal Information</h3>
                    <p className='text-gray-700 mb-3'>We may collect personal information that you voluntarily provide to us, including:</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Name and contact information (email address, phone number)</li>
                      <li>Company name and job title</li>
                      <li>Project inquiries and technical requirements</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Automatically Collected Information</h3>
                    <p className='text-gray-700 mb-3'>When you visit our website, we automatically collect certain information, including:</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>IP address and browser type</li>
                      <li>Pages visited and time spent on each page</li>
                      <li>Referring website and search terms</li>
                      <li>Device information and operating system</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Cookies and Tracking Technologies</h3>
                    <p className='text-gray-700 mb-3'>We use cookies and similar tracking technologies to:</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                      <li>Remember your preferences and settings</li>
                      <li>Analyze website traffic and usage patterns</li>
                      <li>Improve website functionality and user experience</li>
                      <li>Provide personalized content and recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Users className='w-6 h-6' />
                  How We Use Your Information
                </h2>
                
                <p className='text-gray-700 mb-4'>We use the information we collect for various purposes, including:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>Providing and maintaining our services</li>
                  <li>Responding to your inquiries and requests</li>
                  <li>Sending technical information and updates</li>
                  <li>Improving our website and user experience</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Complying with legal obligations</li>
                  <li>Protecting against fraud and security threats</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Lock className='w-6 h-6' />
                  Information Sharing and Disclosure
                </h2>
                
                <p className='text-gray-700 mb-4'>We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                  <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Data Security</h2>
                <p className='text-gray-700 leading-relaxed'>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>

              {/* Your Rights */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Your Rights</h2>
                <p className='text-gray-700 mb-4'>You have the following rights regarding your personal information:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Children's Privacy</h2>
                <p className='text-gray-700 leading-relaxed'>
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              {/* International Transfers */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>International Data Transfers</h2>
                <p className='text-gray-700 leading-relaxed'>
                  Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </div>

              {/* Changes to Privacy Policy */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Changes to This Privacy Policy</h2>
                <p className='text-gray-700 leading-relaxed'>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>

              {/* Contact Information */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Contact Us</h2>
                <p className='text-gray-700 mb-4'>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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