import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, Users, Calendar, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Deep Engineering',
  description: 'Read Deep Engineering\'s terms of service governing the use of our website and services.',
  keywords: 'terms of service, terms and conditions, website usage, Deep Engineering',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'January 2025';

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-primary text-white py-16'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex justify-center mb-6'>
              <FileText className='w-16 h-16 text-white' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Terms of Service
            </h1>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              Please read these terms carefully before using our website and services.
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
                <h2 className='text-2xl font-bold text-primary mb-4'>Agreement to Terms</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  These Terms of Service ("Terms") govern your use of the Deep Engineering website and services. By accessing or using our website, you agree to be bound by these Terms and all applicable laws and regulations.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  If you do not agree with any of these terms, you are prohibited from using or accessing this website. The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
              </div>

              {/* Use License */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Shield className='w-6 h-6' />
                  Use License
                </h2>
                
                <p className='text-gray-700 mb-4'>Permission is granted to temporarily download one copy of the materials (information or software) on Deep Engineering's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4'>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Deep Engineering's website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className='text-gray-700 leading-relaxed'>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by Deep Engineering at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </div>

              {/* Disclaimer */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <AlertTriangle className='w-6 h-6' />
                  Disclaimer
                </h2>
                
                <p className='text-gray-700 mb-4'>The materials on Deep Engineering's website are provided on an 'as is' basis. Deep Engineering makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                <p className='text-gray-700 leading-relaxed'>
                  Further, Deep Engineering does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </div>

              {/* Limitations */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Limitations</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  In no event shall Deep Engineering or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Deep Engineering's website, even if Deep Engineering or a Deep Engineering authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
              </div>

              {/* Accuracy of Materials */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Accuracy of Materials</h2>
                <p className='text-gray-700 leading-relaxed'>
                  The materials appearing on Deep Engineering's website could include technical, typographical, or photographic errors. Deep Engineering does not warrant that any of the materials on its website are accurate, complete or current. Deep Engineering may make changes to the materials contained on its website at any time without notice. However, Deep Engineering does not make any commitment to update the materials.
                </p>
              </div>

              {/* Links */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Links</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Deep Engineering has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Deep Engineering of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              {/* Modifications */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Modifications</h2>
                <p className='text-gray-700 leading-relaxed'>
                  Deep Engineering may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </div>

              {/* Governing Law */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Governing Law</h2>
                <p className='text-gray-700 leading-relaxed'>
                  These terms and conditions are governed by and construed in accordance with the laws of Iraq and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </div>

              {/* User Conduct */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-3'>
                  <Users className='w-6 h-6' />
                  User Conduct
                </h2>
                
                <p className='text-gray-700 mb-4'>When using our website, you agree not to:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-2 ml-4'>
                  <li>Use the website for any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the website</li>
                  <li>Collect or track the personal information of others</li>
                  <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>Use the website for any obscene or immoral purpose</li>
                  <li>Interfere with or circumvent the security features of the website</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Intellectual Property</h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  The website and its original content, features, and functionality are and will remain the exclusive property of Deep Engineering and its licensors. The website is protected by copyright, trademark, and other laws of both Iraq and foreign countries.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>
              </div>

              {/* Termination */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Termination</h2>
                <p className='text-gray-700 leading-relaxed'>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will cease immediately.
                </p>
              </div>

              {/* Severability */}
              <div className='mb-12'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Severability</h2>
                <p className='text-gray-700 leading-relaxed'>
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                </p>
              </div>

              {/* Contact Information */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-primary mb-6'>Contact Us</h2>
                <p className='text-gray-700 mb-4'>If you have any questions about these Terms of Service, please contact us:</p>
                <div className='bg-gray-50 p-6 rounded-lg'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-primary' />
                      <span className='text-gray-700'>Email: legal@deepengineering.co</span>
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