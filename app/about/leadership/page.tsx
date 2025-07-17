import { Metadata } from 'next';
import { Leaf, User } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Leadership | Deep Engineering',
  description: 'Meet the leadership team at Deep Engineering - experienced professionals driving innovation in sustainable energy solutions.',
  keywords: 'leadership, management, executives, Deep Engineering, energy, sustainability',
};

export default function LeadershipPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Our Leadership"
        subtitle="Meet the visionary leaders driving Deep Engineering's mission. Our executive team brings decades of combined experience in energy, technology, and sustainability, guiding our company toward a cleaner, more efficient future."
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Executive Leadership Team
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* CEO */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Chen</h3>
                <p className="text-primary font-medium mb-3">Chief Executive Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dr. Chen brings over 20 years of experience in renewable energy and sustainable technology. 
                  She holds a PhD in Energy Systems from MIT and has led multiple successful energy startups 
                  before founding Deep Engineering.
                </p>
              </div>

              {/* CTO */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Rodriguez</h3>
                <p className="text-primary font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Michael is a technology visionary with expertise in AI, machine learning, and energy optimization. 
                  He has developed breakthrough algorithms that have revolutionized how we approach energy efficiency 
                  and sustainability.
                </p>
              </div>

              {/* CFO */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Jennifer Park</h3>
                <p className="text-primary font-medium mb-3">Chief Financial Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Jennifer oversees all financial operations and strategic planning. With a background in 
                  investment banking and clean energy financing, she ensures sustainable growth while 
                  maintaining our commitment to environmental responsibility.
                </p>
              </div>

              {/* COO */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">David Thompson</h3>
                <p className="text-primary font-medium mb-3">Chief Operations Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  David manages day-to-day operations and ensures seamless execution of our projects. 
                  His expertise in project management and sustainable operations has been instrumental 
                  in scaling our impact across multiple regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Leadership Philosophy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Deep Engineering, we believe in leading by example. Our leadership team is committed to 
              transparency, innovation, and sustainability in everything we do. We foster a culture of 
              continuous learning and collaboration, empowering our team to push the boundaries of what's 
              possible in sustainable energy.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vision-Driven</h3>
                <p className="text-gray-600">
                  We lead with a clear vision of a sustainable future and inspire others to join us on this journey.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborative</h3>
                <p className="text-gray-600">
                  We believe in the power of teamwork and diverse perspectives to solve complex challenges.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable</h3>
                <p className="text-gray-600">
                  Every decision we make considers the long-term impact on our planet and future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 