import Link from 'next/link';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'KPP Economic Analysis & ROI - Deep Engineering',
  description:
    'Comprehensive economic analysis of Kinetic Power Plant (KPP) technology. Cost comparisons vs diesel/solar/gas, ROI projections, fuel savings, and investment opportunities in Iraq.',
  keywords:
    'KPP economics, kinetic power plant cost analysis, renewable energy ROI, Iraq energy investment, fuel cost savings, LCOE comparison, clean energy economics',
  openGraph: {
    title: 'KPP Economic Analysis & ROI - Deep Engineering',
    description:
      'Comprehensive economic analysis of KPP technology with cost comparisons, ROI projections, and investment opportunities.',
    type: 'website',
    url: 'https://deepengineering.co/economics',
    images: [
      {
        url: '/og-economics.jpg',
        width: 1200,
        height: 630,
        alt: 'KPP Economic Analysis - Deep Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KPP Economic Analysis & ROI - Deep Engineering',
    description:
      'Comprehensive economic analysis of KPP technology with cost comparisons and ROI projections.',
    images: ['/og-economics.jpg'],
  },
  alternates: {
    canonical: '/economics',
  },
};

const costComparison = [
  {
    technology: 'KPP Technology',
    lcoe: '€25/MWh',
    fuelCost: '€0/MWh',
    oamCost: '€7/MWh',
    capitalCost: '€1,200/kW',
    color: 'bg-green-500',
  },
  {
    technology: 'Diesel Generators',
    lcoe: '€180/MWh',
    fuelCost: '€150/MWh',
    oamCost: '€30/MWh',
    capitalCost: '€800/kW',
    color: 'bg-red-500',
  },
  {
    technology: 'Solar PV',
    lcoe: '€45/MWh',
    fuelCost: '€0/MWh',
    oamCost: '€15/MWh',
    capitalCost: '€1,000/kW',
    color: 'bg-yellow-500',
  },
  {
    technology: 'Natural Gas',
    lcoe: '€80/MWh',
    fuelCost: '€60/MWh',
    oamCost: '€20/MWh',
    capitalCost: '€1,100/kW',
    color: 'bg-orange-500',
  },
];

const savingsData = [
  { year: 1, savings: 155, cumulative: 155 },
  { year: 2, savings: 155, cumulative: 310 },
  { year: 3, savings: 155, cumulative: 465 },
  { year: 4, savings: 155, cumulative: 620 },
  { year: 5, savings: 155, cumulative: 775 },
  { year: 6, savings: 155, cumulative: 930 },
  { year: 7, savings: 155, cumulative: 1085 },
  { year: 8, savings: 155, cumulative: 1240 },
  { year: 9, savings: 155, cumulative: 1395 },
  { year: 10, savings: 155, cumulative: 1550 },
];

const investmentOpportunities = [
  {
    title: 'Zakho 100MW Project',
    location: 'Duhok Governorate',
    investment: '€120M',
    returns: '15-20%',
    timeline: '24 months',
    status: 'Open for Investment',
  },
  {
    title: 'Soran 100MW Project',
    location: 'Erbil Governorate',
    investment: '€120M',
    returns: '15-20%',
    timeline: '24 months',
    status: 'Open for Investment',
  },
  {
    title: 'Raparin 50MW Project',
    location: 'Sulaymaniyah Governorate',
    investment: '€60M',
    returns: '18-22%',
    timeline: '18 months',
    status: 'Under Development',
  },
  {
    title: 'Garmian 50MW Project',
    location: 'Sulaymaniyah Governorate',
    investment: '€60M',
    returns: '15-20%',
    timeline: '24 months',
    status: 'Open for Investment',
  },
];

export default function EconomicsPage() {
  return (
    <div>
      <HeroSection
        title='Economic Analysis'
        subtitle="Comprehensive economic analysis demonstrating KPP technology's superior cost-effectiveness, impressive ROI, and significant fuel savings compared to traditional energy sources."
      />

      {/* LCOE Comparison */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Levelized Cost of Energy (LCOE) Comparison</h2>
            <p className="text-lg text-white">
              KPP technology delivers the lowest levelized cost of energy among
              all power generation technologies, making it the most economically
              viable solution for Iraq's energy needs.
            </p>
          </div>

          <div className='max-w-6xl mx-auto'>
            <div className='bg-gray-light rounded-lg p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Cost Comparison Table */}
                <div>
                  <h3 className='text-xl font-semibold text-primary mb-6'>
                    Cost Breakdown
                  </h3>
                  <div className='space-y-4'>
                    {costComparison.map((tech, index) => (
                      <div
                        key={index}
                        className='bg-white rounded-lg p-4 border border-gray-200'
                      >
                        <div className='flex items-center justify-between mb-3'>
                          <h4 className="font-semibold text-white">
                            {tech.technology}
                          </h4>
                          <div
                            className={`w-4 h-4 rounded-full ${tech.color}`}
                          ></div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                          <div>
                            <span className="text-white">LCOE:</span>
                            <span className='font-semibold text-primary ml-2'>
                              {tech.lcoe}
                            </span>
                          </div>
                          <div>
                            <span className="text-white">Fuel Cost:</span>
                            <span className="font-semibold text-white">
                              {tech.fuelCost}
                            </span>
                          </div>
                          <div>
                            <span className="text-white">O&M Cost:</span>
                            <span className="font-semibold text-white">
                              {tech.oamCost}
                            </span>
                          </div>
                          <div>
                            <span className="text-white">Capital Cost:</span>
                            <span className="font-semibold text-white">
                              {tech.capitalCost}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Comparison */}
                <div>
                  <h3 className='text-xl font-semibold text-primary mb-6'>
                    Cost Comparison
                  </h3>
                  <div className='space-y-4'>
                    {costComparison.map((tech, index) => {
                      const lcoeValue = parseInt(
                        tech.lcoe.replace('€', '').replace('/MWh', '')
                      );
                      const maxLCOE = 180; // Diesel cost
                      const percentage = (lcoeValue / maxLCOE) * 100;

                      return (
                        <div
                          key={index}
                          className='bg-white rounded-lg p-4 border border-gray-200'
                        >
                          <div className='flex justify-between items-center mb-2'>
                            <span className="font-medium text-white">
                              {tech.technology}
                            </span>
                            <span className='font-bold text-primary'>
                              {tech.lcoe}
                            </span>
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-3'>
                            <div
                              className={`h-3 rounded-full ${tech.color} transition-all duration-1000`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Savings Calculator */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Fuel Savings Analysis</h2>
            <p className="text-lg text-white">
              Calculate the significant fuel savings achieved by replacing
              diesel generators with KPP technology. Based on a 100MW power
              plant operating 24/7.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
              <div className='bg-primary text-white p-6'>
                <h3 className='text-xl font-semibold'>
                  Annual Fuel Savings: €155 Million
                </h3>
                <p className='text-white/90'>
                  100MW KPP vs Diesel Generator Comparison
                </p>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-primary mb-2'>
                      €155M
                    </div>
                    <div className="text-sm text-white">Annual Savings</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-green-600 mb-2'>
                      85%
                    </div>
                    <div className="text-sm text-white">Cost Reduction</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-blue-600 mb-2'>
                      0
                    </div>
                    <div className="text-sm text-white">Fuel Required</div>
                  </div>
                </div>

                {/* Cumulative Savings Chart */}
                <div>
                  <h4 className="font-semibold text-white">
                    Cumulative Savings Over 10 Years
                  </h4>
                  <div className='space-y-2'>
                    {savingsData.map((data, index) => (
                      <div key={index} className='flex items-center gap-4'>
                        <span className="w-16 text-sm text-white">
                          Year {data.year}
                        </span>
                        <div className='flex-1 bg-gray-200 rounded-full h-4'>
                          <div
                            className='bg-primary h-4 rounded-full transition-all duration-1000'
                            style={{
                              width: `${(data.cumulative / 1550) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className='w-24 text-sm font-semibold text-primary'>
                          €{data.cumulative}M
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Projections */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Return on Investment (ROI) Analysis</h2>
            <p className="text-lg text-white">
              KPP technology offers exceptional returns on investment with rapid
              payback periods and long-term profitability projections.
            </p>
          </div>

          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-gray-light rounded-lg p-6 text-center'>
                <div className='text-4xl font-bold text-primary mb-2'>
                  3-4 Years
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Payback Period
                </h3>
                <p className="text-sm text-white">
                  Time to recover initial investment
                </p>
              </div>
              <div className='bg-gray-light rounded-lg p-6 text-center'>
                <div className='text-4xl font-bold text-green-600 mb-2'>
                  15-25%
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Annual ROI
                </h3>
                <p className="text-sm text-white">
                  Return on investment rate
                </p>
              </div>
              <div className='bg-gray-light rounded-lg p-6 text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  25+ Years
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Service Life
                </h3>
                <p className="text-sm text-white">
                  Extended operational lifetime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Investment Opportunities</h2>
            <p className="text-lg text-white">
              Join Deep Engineering in developing Iraq's renewable energy
              infrastructure. Multiple investment opportunities available across
              different project phases.
            </p>
          </div>

          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {investmentOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'
                >
                  <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-xl font-semibold text-primary'>
                      {opportunity.title}
                    </h3>
                    <span className='text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full'>
                      {opportunity.status}
                    </span>
                  </div>

                  <div className='space-y-3 mb-4'>
                    <div className='flex justify-between'>
                      <span className="text-white">Location:</span>
                      <span className='font-medium'>
                        {opportunity.location}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-white">Investment:</span>
                      <span className='font-bold text-primary'>
                        {opportunity.investment}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-white">Expected Returns:</span>
                      <span className='font-bold text-green-600'>
                        {opportunity.returns}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-white">Timeline:</span>
                      <span className='font-medium'>
                        {opportunity.timeline}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition-colors min-w-[44px] min-h-[44px] text-white">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='section-padding bg-primary text-white'>
        <div className='container text-center'>
          <h2 className='mb-4'>Ready to Invest in Clean Energy?</h2>
          <p className='text-xl text-white mb-8 max-w-3xl mx-auto'>
            Join us in transforming Iraq's energy landscape with profitable,
            sustainable, and environmentally responsible power generation.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200'
            >
              Contact Investment Team
            </Link>
            <Link
              href='/projects'
              className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200'
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'KPP Economic Analysis & ROI - Deep Engineering',
            description:
              'Comprehensive economic analysis of Kinetic Power Plant (KPP) technology with cost comparisons, ROI projections, and investment opportunities.',
            author: {
              '@type': 'Organization',
              name: 'Deep Engineering',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Deep Engineering',
              logo: {
                '@type': 'ImageObject',
                url: 'https://deepengineering.co/logo.svg',
              },
            },
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://deepengineering.co/economics',
            },
            about: [
              {
                '@type': 'Thing',
                name: 'Economic Analysis',
                description:
                  'Cost comparison and ROI analysis of KPP technology',
              },
              {
                '@type': 'Thing',
                name: 'LCOE Comparison',
                description:
                  'Levelized Cost of Energy comparison with traditional sources',
              },
              {
                '@type': 'Thing',
                name: 'Investment Opportunities',
                description:
                  'Renewable energy investment opportunities in Iraq',
              },
            ],
            offers: {
              '@type': 'Offer',
              description: 'KPP Technology Investment Opportunities',
              url: 'https://deepengineering.co/contact',
            },
          }),
        }}
      />
    </div>
  );
}
