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
      <section className="section-padding bg-gray-light" aria-label="Key benefits of KPP technology">
        <div className="container">
          <h2 className="text-center mb-16">Why KPP Technology?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Clean Power</h3>
              <p className="text-gray-text">
                Zero emissions, zero fuel consumption. KPP technology generates clean energy 
                without burning fossil fuels or producing harmful byproducts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous 24/7</h3>
              <p className="text-gray-text">
                Unlike solar or wind, KPP provides consistent power generation around the clock, 
                regardless of weather conditions or time of day.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
              <p className="text-gray-text">
                KPP plants can be deployed anywhere, reducing transmission losses and providing 
                energy security for local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MiniAbout />
      <MiniProjects />
      <CTABanner />
    </div>
  );
} 