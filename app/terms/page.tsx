import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Deep Engineering',
  description: 'Read the terms and conditions governing your use of Deep Engineering services and website.',
  keywords: 'terms of service, terms and conditions, Deep Engineering, legal',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-white">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-white">
                By accessing and using the Deep Engineering website and services, you accept and 
                agree to be bound by the terms and provision of this agreement. If you do not 
                agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                2. Use License
              </h2>
              <p className="text-white">
                Permission is granted to temporarily download one copy of the materials 
                (information or software) on Deep Engineering's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                3. Disclaimer
              </h2>
              <p className="text-white">
                The materials on Deep Engineering's website are provided on an 'as is' basis. 
                Deep Engineering makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or 
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                4. Limitations
              </h2>
              <p className="text-white">
                In no event shall Deep Engineering or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on Deep Engineering's website, even if Deep Engineering or a Deep Engineering 
                authorized representative has been notified orally or in writing of the possibility 
                of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                5. Accuracy of Materials
              </h2>
              <p className="text-white">
                The materials appearing on Deep Engineering's website could include technical, 
                typographical, or photographic errors. Deep Engineering does not warrant that 
                any of the materials on its website are accurate, complete, or current. 
                Deep Engineering may make changes to the materials contained on its website 
                at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                6. Links
              </h2>
              <p className="text-white">
                Deep Engineering has not reviewed all of the sites linked to its website and 
                is not responsible for the contents of any such linked site. The inclusion 
                of any link does not imply endorsement by Deep Engineering of the site. 
                Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                7. Modifications
              </h2>
              <p className="text-white">
                Deep Engineering may revise these terms of service for its website at any time 
                without notice. By using this website you are agreeing to be bound by the then 
                current version of these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                8. Governing Law
              </h2>
              <p className="text-white">
                These terms and conditions are governed by and construed in accordance with 
                the laws of Iraq and you irrevocably submit to the exclusive jurisdiction 
                of the courts in that location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                9. Intellectual Property
              </h2>
              <p className="text-white">
                All content on this website, including but not limited to text, graphics, 
                logos, images, and software, is the property of Deep Engineering and is 
                protected by copyright laws. Unauthorized use of any content may violate 
                copyright, trademark, and other applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                10. User Conduct
              </h2>
              <p className="text-white">
                You agree not to use the website to:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Upload or transmit any material that is unlawful, harmful, threatening, abusive, or defamatory</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Use the website for any commercial purpose without our express written consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                11. Termination
              </h2>
              <p className="text-white">
                We may terminate or suspend your access to our website immediately, without 
                prior notice or liability, for any reason whatsoever, including without 
                limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                12. Severability
              </h2>
              <p className="text-white">
                If any provision of these Terms is held to be unenforceable or invalid, 
                such provision will be changed and interpreted to accomplish the objectives 
                of such provision to the greatest extent possible under applicable law 
                and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                13. Contact Information
              </h2>
              <p className="text-white">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Email:</strong> legal@deepengineering.co<br />
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