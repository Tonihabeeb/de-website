import Link from 'next/link';
import {
  Sparkles,
  Landmark,
  BarChart3,
  Leaf,
  Globe,
  Handshake,
  Scale,
  Award,
  TrendingUp,
  Users,
  Shield,
  Target,
  BarChart3 as BarChart3Icon,
  CheckCircle2,
  FileText,
  Eye,
  Zap,
  Heart,
  Brain,
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

export const metadata = {
  title: 'Learn More | About Us',
  description:
    "Learn about Deep Engineering, Iraq's pioneer in renewable energy project development. Founded in 2019, we're the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.",
  keywords:
    'about Deep Engineering, Iraq renewable energy, KPP licensee, kinetic power plant, clean energy company, sustainable power Iraq',
  openGraph: {
    title: "About Deep Engineering - Iraq's Renewable Energy Pioneer",
    description:
      "Learn about Deep Engineering, Iraq's pioneer in renewable energy project development. Founded in 2019, we're the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.",
    url: 'https://deepengineering.co/about/learn-more',
    images: [
      {
        url: '/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Engineering Team and Mission',
      },
    ],
  },
  twitter: {
    title: "About Deep Engineering - Iraq's Renewable Energy Pioneer",
    description:
      "Learn about Deep Engineering, Iraq's pioneer in renewable energy project development. Founded in 2019, we're the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.",
  },
  alternates: {
    canonical: '/about/learn-more',
  },
};

export default function LearnMorePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title='About Deep Engineering'
        subtitle="We are Iraq's premier renewable energy company, dedicated to revolutionizing the country's energy landscape through innovative KPP technology."
      />

      {/* Our Story */}
      <section className='section-padding bg-white' aria-label='Company story'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='mb-6'>Our Story</h2>
            <div className="prose prose-lg text-white">
              <p className="text-lg text-white">
                Deep Engineering was founded with a bold vision: to transform
                Iraq's energy sector through cutting-edge renewable technology.
                As the exclusive licensee of Kinetic Power Plant (KPP)
                technology for Iraq, we are bringing world-class German
                engineering to deliver clean, continuous energy where it's
                needed most.
              </p>
              <p className="text-lg text-white">
                Our journey began with a recognition that Iraq's energy
                challenges required innovative solutions. Traditional power
                generation methods were insufficient, and renewable options like
                solar and wind had limitations. KPP technology offered the
                perfect solution: continuous, clean power generation without
                fuel dependency or weather constraints.
              </p>
              <p className="text-lg text-white">
                Today, we are proud to be leading Iraq's transition to
                sustainable energy, with projects across the country that will
                deliver 390 MW of clean power capacity. Our commitment to
                excellence, innovation, and environmental responsibility drives
                everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className='section-padding bg-gray-light'
        aria-label='Mission and vision'
      >
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              <div>
                <h3 className='mb-4'>Our Mission</h3>
                <p className="text-lg text-white">
                  To revolutionize Iraq's energy landscape by deploying
                  innovative KPP technology that delivers clean, continuous, and
                  reliable power while contributing to environmental
                  sustainability and economic growth.
                </p>
                <p className="text-lg text-white">
                  To accelerate the global transition to sustainable energy
                  through innovative engineering solutions, collaborative
                  partnerships, and unwavering commitment to environmental
                  stewardship.
                </p>
              </div>
              <div>
                <h3 className='mb-4'>Our Vision</h3>
                <p className="text-lg text-white">
                  To be the leading renewable energy company in Iraq, setting
                  new standards for clean energy generation and inspiring the
                  adoption of sustainable technologies across the region.
                </p>
                <p className="text-lg text-white">
                  To be the global leader in sustainable energy solutions,
                  pioneering technologies that transform how the world
                  generates, distributes, and consumes energy while preserving
                  our planet for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className="text-3xl font-bold text-white">
              Our Core Values
            </h2>
            <p className="text-lg text-white">
              These fundamental principles guide our decisions, shape our
              culture, and define how we work with each other and our
              stakeholders.
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <span className='text-white text-2xl'>💡</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Innovation
                </h3>
                <p className="text-white">
                  We constantly push boundaries and embrace new ideas to solve
                  complex challenges.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Sustainability
                </h3>
                <p className="text-white">
                  Every decision we make considers the long-term impact on our
                  planet and communities.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Collaboration
                </h3>
                <p className="text-white">
                  We believe in the power of partnerships and diverse
                  perspectives to achieve our goals.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-2xl'>⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Excellence
                </h3>
                <p className="text-white">
                  We strive for the highest quality in everything we do, from
                  technology to service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESG, CSR, HSE Overview */}
      <section
        className='section-padding bg-white'
        aria-label='ESG, CSR, HSE Overview'
      >
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-primary mb-8'>
              Our Commitment: ESG, CSR & HSE
            </h2>
            <p className="text-lg text-white">
              Deep Engineering integrates Environmental, Social, and Governance
              (ESG), Corporate Social Responsibility (CSR), and Health, Safety &
              Environment (HSE) principles into every aspect of our operations.
              Our goal is to deliver sustainable impact through innovative
              technology, responsible business practices, and a culture of
              safety and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className='section-padding bg-gray-light' aria-label='ESG'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Environmental, Social & Governance (ESG)</h2>
            <p className="text-lg text-white">
              Our comprehensive ESG framework drives sustainable impact through
              the KPP project and responsible business practices.
            </p>
          </div>
          {/* ESG Metrics and Framework (summarized for brevity; full details can be expanded as needed) */}
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='bg-green-50 p-8 rounded-lg border border-green-200'>
              <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6'>
                <Globe className='w-8 h-8 text-white' />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Environmental
              </h3>
              <ul className="text-white">
                <li>Zero emissions technology: no fuel, no pollution</li>
                <li>2.5M tons CO₂ emissions avoided annually</li>
                <li>Zero water consumption, minimal land footprint</li>
                <li>Reforestation, habitat restoration, and conservation</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 text-white">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white">
                <Handshake className='w-8 h-8 text-white' />
              </div>
              <h3 className="text-2xl font-bold text-white">Social</h3>
              <ul className="text-white">
                <li>2,500+ direct and indirect jobs created</li>
                <li>Community development and education initiatives</li>
                <li>Skills training and workforce development</li>
                <li>Health, wellbeing, and safety programs</li>
              </ul>
            </div>
            <div className='bg-purple-50 p-8 rounded-lg border border-purple-200'>
              <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6'>
                <Scale className='w-8 h-8 text-white' />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Governance
              </h3>
              <ul className="text-white">
                <li>International certifications (TÜV, SGS, DEKRA)</li>
                <li>100% government approvals and compliance</li>
                <li>Transparency, ethical leadership, and reporting</li>
                <li>Continuous improvement and stakeholder engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section className='section-padding bg-white' aria-label='CSR'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Corporate Social Responsibility (CSR)</h2>
            <p className="text-lg text-white">
              Our CSR initiatives create value beyond profit, supporting
              communities, education, health, and the environment for a more
              sustainable and equitable world.
            </p>
          </div>
          <div className='grid lg:grid-cols-2 gap-12'>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold text-white">
                Community Development
              </h3>
              <ul className="text-white">
                <li>Educational programs and scholarships for STEM students</li>
                <li>Infrastructure development in underserved areas</li>
                <li>Skills training and job creation programs</li>
                <li>Support for local businesses and entrepreneurs</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold text-white">
                Environmental Stewardship
              </h3>
              <ul className="text-white">
                <li>Reforestation and habitat restoration projects</li>
                <li>Clean energy adoption and carbon offset programs</li>
                <li>Waste reduction and circular economy initiatives</li>
                <li>Environmental education and awareness campaigns</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold text-white">
                Education & Innovation
              </h3>
              <ul className="text-white">
                <li>STEM education programs for schools and universities</li>
                <li>Research partnerships and innovation hubs</li>
                <li>Mentorship programs for young professionals</li>
                <li>Open-source technology development</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold text-white">
                Health & Wellbeing
              </h3>
              <ul className="text-white">
                <li>Healthcare access programs in underserved areas</li>
                <li>Mental health awareness and support services</li>
                <li>Workplace wellness and safety programs</li>
                <li>Disaster relief and emergency response support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HSE Section */}
      <section className='section-padding bg-gray-light' aria-label='HSE'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Health, Safety & Environment (HSE)</h2>
            <p className="text-lg text-white">
              Our comprehensive HSE framework ensures the wellbeing of our
              people and protection of our planet through innovative technology
              and responsible practices.
            </p>
          </div>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 text-white">
              <h3 className="text-2xl font-bold text-white">Health</h3>
              <ul className="text-white">
                <li>Comprehensive health monitoring and wellness programs</li>
                <li>Mental health support and work-life balance initiatives</li>
                <li>Preventive care and early intervention programs</li>
                <li>Quarterly health screenings</li>
              </ul>
            </div>
            <div className='bg-orange-50 p-8 rounded-lg border border-orange-200'>
              <h3 className="text-2xl font-bold text-white">Safety</h3>
              <ul className="text-white">
                <li>Zero harm culture and comprehensive safety protocols</li>
                <li>Continuous training and emergency response teams</li>
                <li>Automated safety interlocks and real-time monitoring</li>
                <li>Monthly emergency drills and safety audits</li>
              </ul>
            </div>
            <div className='bg-green-50 p-8 rounded-lg border border-green-200'>
              <h3 className="text-2xl font-bold text-white">
                Environment
              </h3>
              <ul className="text-white">
                <li>
                  Zero emissions, zero water consumption, minimal land use
                </li>
                <li>Climate action and carbon neutrality leadership</li>
                <li>Environmental monitoring and reporting systems</li>
                <li>ISO 14001 certified environmental management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className='section-padding bg-white' aria-label='Partners'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='mb-4'>Our Partners</h2>
            <p className="text-lg text-white">
              We collaborate with world-class partners to bring the best
              technology and expertise to Iraq's energy sector.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Sparkles className='w-8 h-8 text-white' />
                </div>
                <h3 className='font-semibold mb-2'>Rosch Innovations</h3>
                <p className="text-white">
                  German technology partner and KPP patent holder, providing
                  cutting-edge engineering and technical support.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Landmark className='w-8 h-8 text-white' />
                </div>
                <h3 className='font-semibold mb-2'>
                  KRG Ministry of Electricity
                </h3>
                <p className="text-white">
                  Government partner supporting renewable energy development in
                  the Kurdistan Region of Iraq.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <BarChart3 className='w-8 h-8 text-white' />
                </div>
                <h3 className='font-semibold mb-2'>Board of Investment</h3>
                <p className="text-white">
                  Strategic partner facilitating investment and development
                  opportunities for renewable energy projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className="text-3xl font-bold text-white">
              Strategic Goals
            </h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold text-white">
                  Technology Leadership
                </h3>
                <ul className="space-y-3 text-white">
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>
                      Develop breakthrough renewable energy technologies
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>
                      Advance energy storage and distribution solutions
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>Create intelligent energy management systems</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-blue-500 font-bold'>•</span>
                    <span>Pioneer carbon capture and utilization methods</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold text-white">
                  Global Impact
                </h3>
                <ul className="space-y-3 text-white">
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>
                      Deploy sustainable energy solutions in 50+ countries
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>
                      Reduce global carbon emissions by 1 billion tons
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>
                      Provide clean energy access to 100 million people
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <span className='text-green-500 font-bold'>•</span>
                    <span>Create 10,000+ green jobs worldwide</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className='section-padding bg-primary text-white'
        aria-label='Join our team'
      >
        <div className='container text-center'>
          <h2 className='mb-4'>Join Our Team</h2>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto'>
            Be part of the team revolutionizing Iraq's energy landscape. We're
            always looking for passionate professionals who share our vision for
            a sustainable future.
          </p>
          <Link
            href='/team/careers'
            className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
          >
            View Careers
          </Link>
        </div>
      </section>
    </div>
  );
}
