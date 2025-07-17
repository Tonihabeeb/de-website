import { Metadata } from 'next';
import { Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vision & Mission | Deep Engineering',
  description: 'Deep Engineering\'s vision and mission - driving innovation in sustainable energy solutions for a cleaner, more efficient future.',
  keywords: 'vision, mission, Deep Engineering, sustainable energy, innovation, future, goals',
};

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Vision & Mission
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white font-semibold">
              Shaping the future of sustainable energy through innovation and purpose
            </p>
            <p className="text-lg text-white">
              Our vision and mission guide everything we do, from the technologies we develop to the 
              partnerships we forge, all in pursuit of a cleaner, more sustainable world.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Vision */}
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  To be the global leader in sustainable energy solutions, pioneering technologies that 
                  transform how the world generates, distributes, and consumes energy while preserving 
                  our planet for future generations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      A world powered by 100% renewable energy sources
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      Zero carbon emissions from energy production
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      Universal access to clean, affordable energy
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission */}
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 mx-auto lg:mx-0 mb-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">🎯</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  To accelerate the global transition to sustainable energy through innovative engineering 
                  solutions, collaborative partnerships, and unwavering commitment to environmental stewardship.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      Develop cutting-edge sustainable energy technologies
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      Partner with communities and industries worldwide
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-gray-600">
                      Educate and inspire the next generation of engineers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              These fundamental principles guide our decisions, shape our culture, and define how we 
              work with each other and our stakeholders.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We constantly push boundaries and embrace new ideas to solve complex challenges.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600 text-sm">
                  Every decision we make considers the long-term impact on our planet and communities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-gray-600 text-sm">
                  We believe in the power of partnerships and diverse perspectives to achieve our goals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  We strive for the highest quality in everything we do, from technology to service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Strategic Goals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Leadership</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Develop breakthrough renewable energy technologies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Advance energy storage and distribution solutions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Create intelligent energy management systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Pioneer carbon capture and utilization methods</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Impact</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Deploy sustainable energy solutions in 50+ countries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Reduce global carbon emissions by 1 billion tons</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Provide clean energy access to 100 million people</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Create 10,000+ green jobs worldwide</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Our Promise
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              We promise to remain steadfast in our commitment to sustainability, innovation, and 
              positive impact. Every day, we work toward our vision of a cleaner, more sustainable 
              world, knowing that the future depends on the actions we take today.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">For Our Planet</h3>
                <p className="text-white/80">
                  Protecting and preserving the environment for future generations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">For Our People</h3>
                <p className="text-white/80">
                  Creating opportunities and improving lives through sustainable energy.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">For Our Future</h3>
                <p className="text-white/80">
                  Building a sustainable foundation for generations to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 