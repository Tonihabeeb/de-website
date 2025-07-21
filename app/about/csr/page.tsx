import { Metadata } from 'next';
import { Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSR | Deep Engineering',
  description:
    "Deep Engineering's Corporate Social Responsibility initiatives - making a positive impact on society through sustainable business practices and community engagement.",
  keywords:
    'CSR, corporate social responsibility, community, sustainability, Deep Engineering, social impact',
};

export default function CSRPage() {
  return (
    <div className='min-h-screen'>
      <section className='relative py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
              Corporate Social Responsibility
            </h1>
            <p className='text-xl md:text-2xl mb-4 text-white font-semibold'>
              Making a positive impact on society through sustainable business
              practices
            </p>
            <p className='text-lg text-white'>
              Our CSR initiatives reflect our commitment to creating value
              beyond profit, supporting communities, and contributing to a more
              sustainable and equitable world.
            </p>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
              Our CSR Pillars
            </h2>

            <div className='grid lg:grid-cols-2 gap-12'>
              {/* Community Development */}
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6'>
                  <Leaf className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Community Development
                </h3>
                <p className='text-gray-600 mb-6'>
                  We invest in local communities through education,
                  infrastructure, and economic development initiatives.
                </p>
                <ul className='space-y-3 text-gray-600'>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>
                      Educational programs and scholarships for STEM students
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>Infrastructure development in underserved areas</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>Skills training and job creation programs</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>Support for local businesses and entrepreneurs</span>
                  </li>
                </ul>
              </div>

              {/* Environmental Stewardship */}
              <div className='bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>🌿</span>
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Environmental Stewardship
                </h3>
                <p className='text-gray-600 mb-6'>
                  We protect and preserve the environment through conservation
                  efforts and sustainable practices.
                </p>
                <ul className='space-y-3 text-gray-600'>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>Reforestation and habitat restoration projects</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>
                      Clean energy adoption and carbon offset programs
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>
                      Waste reduction and circular economy initiatives
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>Environmental education and awareness campaigns</span>
                  </li>
                </ul>
              </div>

              {/* Education & Innovation */}
              <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>🎓</span>
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Education & Innovation
                </h3>
                <p className='text-gray-600 mb-6'>
                  We promote learning and innovation to empower the next
                  generation of engineers and scientists.
                </p>
                <ul className='space-y-3 text-gray-600'>
                  <li className='flex items-start space-x-3'>
                    <span className='text-purple-500 font-bold'>•</span>
                    <span>
                      STEM education programs for schools and universities
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-purple-500 font-bold'>•</span>
                    <span>Research partnerships and innovation hubs</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-purple-500 font-bold'>•</span>
                    <span>Mentorship programs for young professionals</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-purple-500 font-bold'>•</span>
                    <span>Open-source technology development</span>
                  </li>
                </ul>
              </div>

              {/* Health & Wellbeing */}
              <div className='bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg'>
                <div className='w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6'>
                  <span className='text-white text-2xl'>❤️</span>
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Health & Wellbeing
                </h3>
                <p className='text-gray-600 mb-6'>
                  We support health initiatives and promote wellbeing in our
                  communities and workplace.
                </p>
                <ul className='space-y-3 text-gray-600'>
                  <li className='flex items-start space-x-3'>
                    <span className='text-red-500 font-bold'>•</span>
                    <span>Healthcare access programs in underserved areas</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-red-500 font-bold'>•</span>
                    <span>Mental health awareness and support services</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-red-500 font-bold'>•</span>
                    <span>Workplace wellness and safety programs</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-red-500 font-bold'>•</span>
                    <span>Disaster relief and emergency response support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
              CSR Impact Metrics
            </h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white p-6 rounded-lg text-center shadow-sm'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>
                  $2.5M
                </div>
                <p className='text-gray-600 text-sm'>Annual CSR Investment</p>
              </div>
              <div className='bg-white p-6 rounded-lg text-center shadow-sm'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  15,000
                </div>
                <p className='text-gray-600 text-sm'>Students Reached</p>
              </div>
              <div className='bg-white p-6 rounded-lg text-center shadow-sm'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>
                  50+
                </div>
                <p className='text-gray-600 text-sm'>Community Projects</p>
              </div>
              <div className='bg-white p-6 rounded-lg text-center shadow-sm'>
                <div className='text-3xl font-bold text-red-600 mb-2'>95%</div>
                <p className='text-gray-600 text-sm'>Employee Participation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
              Featured CSR Programs
            </h2>

            <div className='space-y-8'>
              <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-xl'>🎓</span>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      Deep Engineering Scholars Program
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      Providing full scholarships and mentorship to promising
                      students pursuing degrees in engineering and
                      sustainability. Since 2020, we've supported over 200
                      students across 15 countries.
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      <span className='px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm'>
                        Education
                      </span>
                      <span className='px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm'>
                        Mentorship
                      </span>
                      <span className='px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm'>
                        Global Reach
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-xl'>🌱</span>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      Green Communities Initiative
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      Partnering with local communities to implement sustainable
                      energy solutions and environmental conservation projects.
                      We've helped 25 communities transition to renewable energy
                      sources.
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      <span className='px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm'>
                        Sustainability
                      </span>
                      <span className='px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm'>
                        Community
                      </span>
                      <span className='px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm'>
                        Renewable Energy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-lg'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-xl'>🔬</span>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      Innovation for Good
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      Supporting research and development of technologies that
                      address global challenges in healthcare, education, and
                      environmental protection. We've funded 30+ research
                      projects worldwide.
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      <span className='px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm'>
                        Innovation
                      </span>
                      <span className='px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm'>
                        Research
                      </span>
                      <span className='px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm'>
                        Global Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-primary text-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8'>Our CSR Commitment</h2>
            <p className='text-xl leading-relaxed mb-8'>
              We believe that business success and social responsibility go hand
              in hand. Our CSR initiatives are not just about giving
              back—they're about creating lasting positive change and building a
              better future for all.
            </p>
            <div className='grid md:grid-cols-3 gap-8 mt-12'>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>🤝</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Partnership</h3>
                <p className='text-white/80'>
                  We work with communities, NGOs, and governments to maximize
                  our positive impact.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>📊</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Transparency</h3>
                <p className='text-white/80'>
                  We measure and report our CSR impact to ensure accountability
                  and continuous improvement.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>🌍</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Global Reach</h3>
                <p className='text-white/80'>
                  Our CSR programs extend across borders to create positive
                  change worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
