import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import MiniAbout from '@/components/sections/MiniAbout';
import MiniProjects from '@/components/sections/MiniProjects';
import CTABanner from '@/components/sections/CTABanner';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { BoltIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  return (
    <div>
      <EnhancedHeroSection />
      
      {/* Features Grid Section */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <FadeInWhenVisible>
            <h2 className="text-center mb-16">Why KPP Technology?</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BoltIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clean Power</h3>
                <p className="text-gray-text">No fuel or emissions – 100% green energy.</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous 24/7</h3>
                <p className="text-gray-text">Uninterrupted baseload power.</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-white" />
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