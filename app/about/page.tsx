import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles, Landmark, BarChart3 } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

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
      <HeroSection
        title="About Deep Engineering"
        subtitle="We are Iraq's premier renewable energy company, dedicated to revolutionizing the country's energy landscape through innovative KPP technology."
      />

      {/* Company Story */}
      <section className="section-padding bg-white" aria-label="Company story">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-text">
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Deep Engineering was founded with a bold vision: to transform Iraq's energy sector 
                through cutting-edge renewable technology. As the exclusive licensee of Kinetic Power 
                Plant (KPP) technology for Iraq, we are bringing world-class German engineering to 
                deliver clean, continuous energy where it's needed most.
              </p>
              <p className="text-lg text-gray-text mb-6 leading-relaxed">
                Our journey began with a recognition that Iraq's energy challenges required innovative 
                solutions. Traditional power generation methods were insufficient, and renewable options 
                like solar and wind had limitations. KPP technology offered the perfect solution: 
                continuous, clean power generation without fuel dependency or weather constraints.
              </p>
              <p className="text-lg text-gray-text leading-relaxed">
                Today, we are proud to be leading Iraq's transition to sustainable energy, with 
                projects across the country that will deliver 390 MW of clean power capacity. 
                Our commitment to excellence, innovation, and environmental responsibility drives 
                everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-light" aria-label="Mission and vision">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="mb-4">Our Mission</h3>
                <p className="text-lg text-gray-text leading-relaxed">
                  To revolutionize Iraq's energy landscape by deploying innovative KPP technology 
                  that delivers clean, continuous, and reliable power while contributing to 
                  environmental sustainability and economic growth.
                </p>
              </div>
              <div>
                <h3 className="mb-4">Our Vision</h3>
                <p className="text-lg text-gray-text leading-relaxed">
                  To be the leading renewable energy company in Iraq, setting new standards for 
                  clean energy generation and inspiring the adoption of sustainable technologies 
                  across the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-white" aria-label="Partners">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-4">Our Partners</h2>
            <p className="text-lg text-gray-text mb-8 leading-relaxed">
              We collaborate with world-class partners to bring the best technology and expertise 
              to Iraq's energy sector.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Rosch Innovations</h3>
                <p className="text-gray-text text-sm">
                  German technology partner and KPP patent holder, providing cutting-edge 
                  engineering and technical support.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Landmark className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">KRG Ministry of Electricity</h3>
                <p className="text-gray-text text-sm">
                  Government partner supporting renewable energy development in the 
                  Kurdistan Region of Iraq.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Board of Investment</h3>
                <p className="text-gray-text text-sm">
                  Strategic partner facilitating investment and development opportunities 
                  for renewable energy projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white" aria-label="Join our team">
        <div className="container text-center">
          <h2 className="mb-4">Join Our Team</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Be part of the team revolutionizing Iraq's energy landscape. We're always looking 
            for passionate professionals who share our vision for a sustainable future.
          </p>
          <Link 
            href="/team/careers"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            View Careers
          </Link>
        </div>
      </section>
    </div>
  );
} 