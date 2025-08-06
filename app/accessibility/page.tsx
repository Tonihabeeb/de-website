import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility | Deep Engineering',
  description: 'Learn about Deep Engineering\'s commitment to accessibility and the features we provide for all users.',
  keywords: 'accessibility, WCAG, inclusive design, Deep Engineering',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white">
            Accessibility Statement
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-white">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                1. Our Commitment to Accessibility
              </h2>
              <p className="text-white">
                Deep Engineering is committed to ensuring digital accessibility for people with 
                disabilities. We are continually improving the user experience for everyone and 
                applying the relevant accessibility standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                2. Conformance Status
              </h2>
              <p className="text-white">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
                and developers to improve accessibility for people with disabilities. It defines 
                three levels of conformance: Level A, Level AA, and Level AAA. Deep Engineering 
                is partially conformant with WCAG 2.1 level AA. Partially conformant means that 
                some parts of the content do not fully conform to the accessibility standard.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                3. Accessibility Features
              </h2>
              <p className="text-white">
                Our website includes the following accessibility features:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li><strong>Keyboard Navigation:</strong> All interactive elements can be accessed using a keyboard</li>
                <li><strong>Screen Reader Support:</strong> Proper ARIA labels and semantic HTML structure</li>
                <li><strong>High Contrast:</strong> Sufficient color contrast ratios for text readability</li>
                <li><strong>Alt Text:</strong> Descriptive alt text for all images</li>
                <li><strong>Focus Indicators:</strong> Clear focus indicators for keyboard navigation</li>
                <li><strong>Resizable Text:</strong> Text can be resized up to 200% without loss of functionality</li>
                <li><strong>Skip Links:</strong> Skip to main content links for keyboard users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                4. Known Accessibility Issues
              </h2>
              <p className="text-white">
                We are aware of the following accessibility issues and are working to resolve them:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Some complex interactive elements may require additional ARIA labels</li>
                <li>Video content may need additional captions and transcripts</li>
                <li>Some third-party integrations may not be fully accessible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                5. Technical Specifications
              </h2>
              <p className="text-white">
                Accessibility of Deep Engineering relies on the following technologies to work 
                with the particular combination of web browser and any assistive technologies 
                or plugins installed on your computer:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>HTML</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
              <p className="text-white">
                These technologies are relied upon for conformance with the accessibility 
                standards used.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                6. Assessment Methods
              </h2>
              <p className="text-white">
                Deep Engineering assessed the accessibility of our website by the following approaches:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Self-evaluation using automated accessibility testing tools</li>
                <li>Manual testing with screen readers and keyboard navigation</li>
                <li>User testing with individuals with disabilities</li>
                <li>Regular accessibility audits and reviews</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                7. Compatibility
              </h2>
              <p className="text-white">
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                <li>Keyboard navigation</li>
                <li>Voice recognition software</li>
                <li>Magnification software</li>
                <li>High contrast mode</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                8. Browser Compatibility
              </h2>
              <p className="text-white">
                Our website is tested and optimized for the following browsers:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Chrome (latest version)</li>
                <li>Firefox (latest version)</li>
                <li>Safari (latest version)</li>
                <li>Edge (latest version)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                9. Feedback and Contact Information
              </h2>
              <p className="text-white">
                We welcome your feedback on the accessibility of our website. Please let us know 
                if you encounter accessibility barriers or have suggestions for improvement:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Email:</strong> accessibility@deepengineering.co<br />
                  <strong>Phone:</strong> +964 750 XXX XXXX<br />
                  <strong>Address:</strong> Deep Engineering, [Your Address]
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                10. Continuous Improvement
              </h2>
              <p className="text-white">
                We are committed to continuously improving the accessibility of our website. 
                This includes:
              </p>
              <ul className="list-disc pl-6 text-white">
                <li>Regular accessibility audits and testing</li>
                <li>Training our development team on accessibility best practices</li>
                <li>Incorporating accessibility requirements into our design and development process</li>
                <li>Staying updated with the latest accessibility standards and guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                11. Alternative Formats
              </h2>
              <p className="text-white">
                If you need information from our website in an alternative format, please 
                contact us and we will work to provide the information in a format that 
                meets your needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                12. Updates to This Statement
              </h2>
              <p className="text-white">
                We may update this accessibility statement from time to time to reflect 
                changes in our practices or for other operational, legal, or regulatory reasons. 
                We will notify you of any material changes by posting the updated statement 
                on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 