import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import MiniAbout from '@/components/sections/MiniAbout';
import MiniProjects from '@/components/sections/MiniProjects';
import CTABanner from '@/components/sections/CTABanner';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { Zap, Clock, MapPin } from 'lucide-react';

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
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clean Power</h3>
              <p className="text-gray-text">
                Zero emissions, zero fuel consumption. KPP technology generates clean energy 
                without burning fossil fuels or producing harmful byproducts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous 24/7</h3>
              <p className="text-gray-text">
                Unlike solar or wind, KPP provides consistent power generation around the clock, 
                regardless of weather conditions or time of day.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
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