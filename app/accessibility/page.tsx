import type { Metadata } from 'next';
import Link from 'next/link';
import { Accessibility, Eye, Ear, Hand, Brain, Mail, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Deep Engineering',
  description: 'Deep Engineering\'s commitment to website accessibility and inclusive design for all users.',
  keywords: 'accessibility, inclusive design, website accessibility, Deep Engineering',
};

export default function AccessibilityPage() {
  const lastUpdated = 'January 2025';

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-primary text-white py-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex justify-center mb-6'>
              <Accessibility className='w-16 h-16 text-white' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Accessibility Statement
            </h1>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              We are committed to ensuring our website is accessible to all users, including those with disabilities.
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
                <h2 className='text-2xl font-bold text-primary mb-4'>Our Commitment</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Deep Engineering is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  We believe that websites and digital content should be accessible to all users, regardless of their abilities or the technologies they use to access the web.
                </p>
              </div>

              {/* Accessibility Features */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Accessibility Features</h2>
                
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='bg-blue-50 p-6 rounded-lg'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Eye className='w-6 h-6 text-primary' />
                      <h3 className='text-lg font-semibold text-gray-800'>Visual Accessibility</h3>
                    </div>
                    <ul className='text-gray-700 space-y-2'>
                      <li>• High contrast color schemes</li>
                      <li>• Scalable text and zoom support</li>
                      <li>• Clear typography and spacing</li>
                      <li>• Alt text for images</li>
                    </ul>
                  </div>

                  <div className='bg-green-50 p-6 rounded-lg'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Ear className='w-6 h-6 text-primary' />
                      <h3 className='text-lg font-semibold text-gray-800'>Audio Accessibility</h3>
                    </div>
                    <ul className='text-gray-700 space-y-2'>
                      <li>• Screen reader compatibility</li>
                      <li>• Keyboard navigation support</li>
                      <li>• Audio descriptions where needed</li>
                      <li>• Clear audio controls</li>
                    </ul>
                  </div>

                  <div className='bg-purple-50 p-6 rounded-lg'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Hand className='w-6 h-6 text-primary' />
                      <h3 className='text-lg font-semibold text-gray-800'>Motor Accessibility</h3>
                    </div>
                    <ul className='text-gray-700 space-y-2'>
                      <li>• Keyboard-only navigation</li>
                      <li>• Large click targets</li>
                      <li>• No time limits on forms</li>
                      <li>• Voice control compatibility</li>
                    </ul>
                  </div>

                  <div className='bg-orange-50 p-6 rounded-lg'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Brain className='w-6 h-6 text-primary' />
                      <h3 className='text-lg font-semibold text-gray-800'>Cognitive Accessibility</h3>
                    </div>
                    <ul className='text-gray-700 space-y-2'>
                      <li>• Clear and simple language</li>
                      <li>• Consistent navigation</li>
                      <li>• Logical content structure</li>
                      <li>• Error prevention and recovery</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Standards Compliance */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Standards Compliance</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  We strive to meet or exceed the following accessibility standards:
                </p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li><strong>WCAG 2.1:</strong> Web Content Accessibility Guidelines (Level AA)</li>
                  <li><strong>Section 508:</strong> Rehabilitation Act of 1973</li>
                  <li><strong>ADA:</strong> Americans with Disabilities Act compliance</li>
                  <li><strong>EN 301 549:</strong> European accessibility standard</li>
                </ul>
              </div>

              {/* Technical Measures */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Technical Measures</h2>
                <p className='text-gray-700 mb-4'>We implement the following technical measures to ensure accessibility:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>Semantic HTML structure for screen readers</li>
                  <li>ARIA (Accessible Rich Internet Applications) labels and roles</li>
                  <li>Proper heading hierarchy (H1, H2, H3, etc.)</li>
                  <li>Color contrast ratios that meet WCAG guidelines</li>
                  <li>Focus indicators for keyboard navigation</li>
                  <li>Alternative text for all images</li>
                  <li>Captions and transcripts for multimedia content</li>
                  <li>Responsive design for various screen sizes</li>
                </ul>
              </div>

              {/* Known Limitations */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Known Limitations</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  While we strive for comprehensive accessibility, we acknowledge that some areas of our website may have limitations:
                </p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>Some older PDF documents may not be fully accessible</li>
                  <li>Third-party content may not meet our accessibility standards</li>
                  <li>Some interactive elements may require JavaScript for full functionality</li>
                  <li>Video content may not always have captions or audio descriptions</li>
                </ul>
                <p className='text-gray-700 leading-relaxed mt-4'>
                  We are actively working to address these limitations and improve accessibility across all areas of our website.
                </p>
              </div>

              {/* Testing and Evaluation */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Testing and Evaluation</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  We regularly test our website for accessibility using:
                </p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>Automated accessibility testing tools</li>
                  <li>Manual testing with screen readers</li>
                  <li>Keyboard-only navigation testing</li>
                  <li>Color contrast analysis</li>
                  <li>User testing with people with disabilities</li>
                  <li>Expert accessibility audits</li>
                </ul>
              </div>

              {/* Feedback and Support */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Feedback and Support</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  We welcome feedback on the accessibility of our website. If you experience accessibility barriers or have suggestions for improvement, please contact us:
                </p>
                <div className='bg-gray-50 p-6 rounded-lg'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-primary' />
                      <span className='text-gray-700'>Email: accessibility@deepengineering.co</span>
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
                <p className='text-gray-700 leading-relaxed mt-4'>
                  We will respond to accessibility feedback within 2 business days and work to address any issues promptly.
                </p>
              </div>

              {/* Continuous Improvement */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Continuous Improvement</h2>
                <p className='text-gray-700 leading-relaxed'>
                  We are committed to continuously improving the accessibility of our website. This includes regular reviews, updates based on user feedback, and staying current with accessibility best practices and standards.
                </p>
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