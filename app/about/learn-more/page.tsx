import Link from 'next/link';
import {
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
  FileText,
  Eye,
  Zap,
  Heart,
  Brain,
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
  Lightbulb,
  Sprout,
  Star,
  ArrowRight,
  Calendar,
  MapPin as MapPinIcon,
  Users as UsersIcon,
  Zap as ZapIcon,
} from 'lucide-react';
import Image from 'next/image';
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
    <div className='min-h-screen'>
      {/* Hero Section */}
      <HeroSection
        title='About Deep Engineering'
        subtitle="We are Iraq's premier renewable energy company, dedicated to revolutionizing the country's energy landscape through innovative KPP technology."
      >
        <div className='flex flex-wrap justify-center gap-4 mt-8'>
          <Link
            href='/technology'
            className='bg-white text-primary px-6 py-3 rounded-lg font-semibold hover-effect flex items-center gap-2 transition-all duration-200'
          >
            Explore Our Technology
            <ArrowRight className='w-4 h-4' />
          </Link>
          <Link
            href='/projects'
            className='border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-300 transition-all duration-200 flex items-center gap-2'
          >
            View Our Projects
            <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      </HeroSection>

      {/* Quick Stats */}
      <section className='py-12 bg-white border-b border-gray-100'>
        <div className='container'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Calendar className='w-8 h-8 text-white' />
              </div>
              <div className='text-3xl font-bold text-primary mb-2'>2019</div>
              <div className='text-gray-text text-sm'>Founded</div>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                <ZapIcon className='w-8 h-8 text-white' />
              </div>
              <div className='text-3xl font-bold text-primary mb-2'>390 MW</div>
              <div className='text-gray-text text-sm'>Clean Power Capacity</div>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                <UsersIcon className='w-8 h-8 text-white' />
              </div>
              <div className='text-3xl font-bold text-primary mb-2'>2,500+</div>
              <div className='text-gray-text text-sm'>Jobs Created</div>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4'>
                <MapPinIcon className='w-8 h-8 text-white' />
              </div>
              <div className='text-3xl font-bold text-primary mb-2'>Iraq</div>
              <div className='text-gray-text text-sm'>Exclusive License</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className='section-padding bg-gray-light' aria-label='Company story'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Our Story</h2>
              <div className='w-24 h-1 bg-primary mx-auto'></div>
            </div>
            <div className='prose prose-lg text-gray-text'>
              <p className='text-lg text-gray-text mb-6 leading-relaxed'>
                Deep Engineering was founded with a bold vision: to transform
                Iraq's energy sector through cutting-edge renewable technology.
                As the exclusive licensee of Kinetic Power Plant (KPP)
                technology for Iraq, we are bringing world-class German
                engineering to deliver clean, continuous energy where it's
                needed most.
              </p>
              <p className='text-lg text-gray-text mb-6 leading-relaxed'>
                Our journey began with a recognition that Iraq's energy
                challenges required innovative solutions. Traditional power
                generation methods were insufficient, and renewable options like
                solar and wind had limitations. KPP technology offered the
                perfect solution: continuous, clean power generation without
                fuel dependency or weather constraints.
              </p>
              <p className='text-lg text-gray-text leading-relaxed'>
                Today, we are proud to be leading Iraq's transition to
                sustainable energy, with projects across the country that will
                deliver 390 MW of clean power capacity. Our commitment to
                excellence, innovation, and environmental responsibility drives
                everything we do.
              </p>
            </div>
            <div className='text-center mt-8'>
              <Link
                href='/technology/how-it-works'
                className='inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white transition-all duration-200'
              >
                Learn How KPP Works
                <ArrowRight className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className='section-padding bg-white'
        aria-label='Mission and vision'
      >
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Mission & Vision</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text max-w-3xl mx-auto'>
                Our mission drives our daily actions, while our vision inspires our long-term goals for a sustainable energy future.
              </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Target className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>Our Mission</h3>
                </div>
                <p className='text-lg text-gray-text leading-relaxed mb-4'>
                  To revolutionize Iraq's energy landscape by deploying
                  innovative KPP technology that delivers clean, continuous, and
                  reliable power while contributing to environmental
                  sustainability and economic growth.
                </p>
                <p className='text-lg text-gray-text leading-relaxed'>
                  To accelerate the global transition to sustainable energy
                  through innovative engineering solutions, collaborative
                  partnerships, and unwavering commitment to environmental
                  stewardship.
                </p>
              </div>
              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Eye className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>Our Vision</h3>
                </div>
                <p className='text-lg text-gray-text leading-relaxed mb-4'>
                  To be the leading renewable energy company in Iraq, setting
                  new standards for clean energy generation and inspiring the
                  adoption of sustainable technologies across the region.
                </p>
                <p className='text-lg text-gray-text leading-relaxed'>
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
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='max-w-6xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Our Core Values
            </h2>
            <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            <p className='text-lg text-gray-text leading-relaxed mb-12 max-w-3xl mx-auto'>
              These fundamental principles guide our decisions, shape our
              culture, and define how we work with each other and our
              stakeholders.
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3'>
                    <Lightbulb className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>
                    Innovation
                  </h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  We constantly push boundaries and embrace new ideas to solve
                  complex challenges.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3'>
                    <Sprout className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>
                    Sustainability
                  </h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  Every decision we make considers the long-term impact on our
                  planet and communities.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3'>
                    <Handshake className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>
                    Collaboration
                  </h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
                  We believe in the power of partnerships and diverse
                  perspectives to achieve our goals.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl hover-effect'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3'>
                    <Star className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-semibold text-primary'>
                    Excellence
                  </h3>
                </div>
                <p className='text-gray-text text-sm leading-relaxed'>
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
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Our Commitment: ESG, CSR & HSE
            </h2>
            <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            <p className='text-lg text-gray-text mb-8 leading-relaxed'>
              Deep Engineering integrates Environmental, Social, and Governance
              (ESG), Corporate Social Responsibility (CSR), and Health, Safety &
              Environment (HSE) principles into every aspect of our operations.
              Our goal is to deliver sustainable impact through innovative
              technology, responsible business practices, and a culture of
              safety and wellbeing.
            </p>
            <Link
              href='/resources/environmental-esg'
              className='inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white transition-all duration-200'
            >
              View ESG Report
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className='section-padding bg-gray-light' aria-label='ESG'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>Environmental, Social & Governance (ESG)</h2>
            <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our comprehensive ESG framework drives sustainable impact through
              the KPP project and responsible business practices.
            </p>
          </div>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Globe className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>
                  Environmental
                </h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Zero emissions technology: no fuel, no pollution</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>2.5M tons CO₂ emissions avoided annually</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Zero water consumption, minimal land footprint</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reforestation, habitat restoration, and conservation</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Handshake className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Social</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>2,500+ direct and indirect jobs created</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Community development and education initiatives</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Skills training and workforce development</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Health, wellbeing, and safety programs</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Scale className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>
                  Governance
                </h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>International certifications (TÜV, SGS, DEKRA)</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>100% government approvals and compliance</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transparency, ethical leadership, and reporting</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuous improvement and stakeholder engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section className='section-padding bg-white' aria-label='CSR'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>Corporate Social Responsibility (CSR)</h2>
            <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our CSR initiatives create value beyond profit, supporting
              communities, education, health, and the environment for a more
              sustainable and equitable world.
            </p>
          </div>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Users className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Community Development</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Educational programs and scholarships for STEM students</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Infrastructure development in underserved areas</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Skills training and job creation programs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Support for local businesses and entrepreneurs</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Brain className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Education & Innovation</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>STEM education programs for schools and universities</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Research partnerships and innovation hubs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mentorship programs for young professionals</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Open-source technology development</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Leaf className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Environmental Stewardship</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reforestation and habitat restoration projects</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Clean energy adoption and carbon offset programs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Waste reduction and circular economy initiatives</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Environmental education and awareness campaigns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HSE Section */}
      <section className='section-padding bg-gray-light' aria-label='HSE'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-primary mb-4'>Health, Safety & Environment (HSE)</h2>
            <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            <p className='text-lg text-gray-text max-w-3xl mx-auto'>
              Our comprehensive HSE framework ensures the wellbeing of our
              people and protection of our planet through innovative technology
              and responsible practices.
            </p>
          </div>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Heart className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Health</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comprehensive health monitoring and wellness programs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mental health support and work-life balance initiatives</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Preventive care and early intervention programs</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Quarterly health screenings</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Shield className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>Safety</h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Zero harm culture and comprehensive safety protocols</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuous training and emergency response teams</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Automated safety interlocks and real-time monitoring</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Monthly emergency drills and safety audits</span>
                </li>
              </ul>
            </div>
            <div className='bg-white p-8 rounded-xl hover-effect'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                  <Leaf className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-primary'>
                  Environment
                </h3>
              </div>
              <ul className='text-gray-text text-sm space-y-3'>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Zero emissions, zero water consumption, minimal land use
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Climate action and carbon neutrality leadership</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Environmental monitoring and reporting systems</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>ISO 14001 certified environmental management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className='section-padding bg-white' aria-label='Partners'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Our Partners</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
              <p className='text-lg text-gray-text mb-8 leading-relaxed max-w-3xl mx-auto'>
                We collaborate with world-class partners to bring the best
                technology and expertise to Iraq's energy sector.
              </p>
            </div>
            {/* Partners */}
            <div className='mb-12'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-primary mb-4'>Technical</h3>
                <div className='w-16 h-1 bg-primary mx-auto mb-4'></div>
              </div>
              <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-300'>
                <div className='flex flex-col items-center'>
                  <Image
                    src='/logos/Screenshot_2025-08-01_183639-removebg-preview.png'
                    alt='Partner Logo 1'
                    width={170}
                    height={64}
                    className='w-40 h-16 filter grayscale brightness-50 contrast-150 opacity-60 hover:opacity-100 transition-opacity duration-300'
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <Image
                    src='/logos/htl-logo_weiß_250x100-removebg-preview.png'
                    alt='HTL Logo'
                    width={170}
                    height={64}
                    className='w-40 h-16 filter grayscale brightness-50 contrast-150 opacity-60 hover:opacity-100 transition-opacity duration-300'
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <Image
                    src='/logos/nyco.png'
                    alt='NYCO Logo'
                    width={170}
                    height={64}
                    className='w-40 h-16 filter grayscale brightness-50 contrast-150 opacity-60 hover:opacity-100 transition-opacity duration-300'
                  />
                </div>
              </div>
            </div>

            {/* Clients */}
            <div className='mt-12'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-primary mb-4'>Clients</h3>
                <div className='w-16 h-1 bg-primary mx-auto mb-4'></div>
              </div>
              <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-300'>
                <div className='flex flex-col items-center'>
                  <Image
                    src='/logos/moel logo.png'
                    alt='Moel Logo'
                    width={170}
                    height={64}
                    className='w-40 h-16 filter grayscale brightness-50 contrast-150 opacity-60 hover:opacity-100 transition-opacity duration-300'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-primary mb-4'>Strategic Goals</h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            </div>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Zap className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>
                    Technology Leadership
                  </h3>
                </div>
                <ul className='space-y-3 text-gray-text'>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Develop breakthrough renewable energy technologies
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Advance energy storage and distribution solutions
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Create intelligent energy management systems</span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Pioneer carbon capture and utilization methods</span>
                  </li>
                </ul>
              </div>
              <div className='bg-white p-8 rounded-xl hover-effect'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4'>
                    <Globe className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-primary'>
                    Global Impact
                  </h3>
                </div>
                <ul className='space-y-3 text-gray-text'>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Deploy sustainable energy solutions in 50+ countries
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Reduce global carbon emissions by 1 billion tons
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Provide clean energy access to 100 million people
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
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
          <h2 className='text-3xl font-bold mb-4'>Join Our Team</h2>
          <div className='w-24 h-1 bg-white mx-auto mb-8'></div>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed'>
            Be part of the team revolutionizing Iraq's energy landscape. We're
            always looking for passionate professionals who share our vision for
            a sustainable future.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/team/careers'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover-effect transition-all duration-200 flex items-center gap-2'
            >
              View Careers
              <ArrowRight className='w-5 h-5' />
            </Link>
            <Link
              href='/contact'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-300 transition-all duration-200 flex items-center gap-2'
            >
              Contact Us
              <ArrowRight className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
