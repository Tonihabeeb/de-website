import HeroSection from '@/components/sections/HeroSection';
import MiniAbout from '@/components/sections/MiniAbout';
import MiniProjects from '@/components/sections/MiniProjects';
import CTABanner from '@/components/sections/CTABanner';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Features Grid Section */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <FadeInWhenVisible>
            <h2 className="text-center mb-16">Why KPP Technology?</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Clean Power</h3>
                <p className="text-gray-text">No fuel or emissions – 100% green energy.</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous 24/7</h3>
                <p className="text-gray-text">Uninterrupted baseload power, day and night.</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
                <p className="text-gray-text">Installable at the point of need, even off-grid.</p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <MiniAbout />
      <MiniProjects />
      <CTABanner />
    </div>
  );
} 