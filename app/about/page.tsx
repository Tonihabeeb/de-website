import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Deep Engineering, Iraq\'s pioneer in renewable energy project development. Founded in 2019, we\'re the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.',
  keywords: 'about Deep Engineering, Iraq renewable energy, KPP licensee, kinetic power plant, clean energy company, sustainable power Iraq',
  openGraph: {
    title: 'About Deep Engineering - Iraq\'s Renewable Energy Pioneer',
    description: 'Learn about Deep Engineering, Iraq\'s pioneer in renewable energy project development. Founded in 2019, we\'re the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.',
    url: 'https://deepengineering.co/about',
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
    title: 'About Deep Engineering - Iraq\'s Renewable Energy Pioneer',
    description: 'Learn about Deep Engineering, Iraq\'s pioneer in renewable energy project development. Founded in 2019, we\'re the exclusive KPP licensee bringing world-class kinetic power plant technology to Iraq.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-white drop-shadow-md">About Deep Engineering</h1>
            <p className="text-xl text-white leading-relaxed">
              Iraq's pioneer in renewable energy project development, turning innovative 
              technology into sustainable power solutions for a brighter future.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Story</h2>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Founded in 2019 in Erbil, with a branch in Basra, Deep Engineering emerged from a vision to transform 
                Iraq's energy landscape. We recognized the urgent need for reliable, clean 
                power solutions that could work anywhere, anytime.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Our journey began with a small team of passionate engineers and has grown into 
                a multidisciplinary organization of 35+ professionals across mechanical, 
                electrical, SCADA, and finance disciplines.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Today, we're proud to be the exclusive KPP licensee for Iraq, bringing 
                world-class kinetic power plant technology to deliver clean, continuous 
                energy where it's needed most.
              </p>
              <p className="text-lg text-gray-text leading-relaxed">
                Our achievements include the 90 MW KPP project in Samawah and 300 MW in KRG in development, 
                demonstrating our commitment to Iraq's sustainable energy future.
              </p>
            </div>
            <div className="bg-gray-light rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2019</div>
                  <div className="text-base text-gray-text">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">35+</div>
                  <div className="text-base text-gray-text">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">390 MW</div>
                  <div className="text-base text-gray-text">Planned Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <div className="text-base text-gray-text">Offices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="mb-4">Our Mission</h3>
              <p className="text-gray-text leading-relaxed">
                To bridge the gap in reliable power supply by harnessing innovative 
                technologies that provide clean, continuous energy for Iraq and beyond.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="mb-4">Our Vision</h3>
              <p className="text-gray-text leading-relaxed">
                To be the leading renewable energy developer in the region, powering 
                sustainable growth through cutting-edge technology and unwavering commitment 
                to environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Partners</h2>
            <p className="text-lg text-gray-text max-w-3xl mx-auto">
              We collaborate with world-class technology providers and government entities 
              to deliver the best solutions for Iraq's energy needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Rosch Innovations</h3>
              <p className="text-gray-text text-base">Exclusive KPP technology provider from Germany</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">KRG Ministry of Electricity</h3>
              <p className="text-gray-text text-base">Government partnership for regional projects</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Board of Investment</h3>
              <p className="text-gray-text text-base">Strategic partnership for national projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Join Our Team</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            We're always looking for passionate professionals who share our vision for 
            a sustainable energy future.
          </p>
          <Link 
            href="/team"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Meet Our Team
          </Link>
        </div>
      </section>
    </div>
  );
} 