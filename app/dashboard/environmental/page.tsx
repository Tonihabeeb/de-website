import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import {
  Globe,
  Leaf,
  BarChart3,
  CheckCircle2,
  Award,
  TrendingUp,
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function EnvironmentDashboardPage() {
  return (
    <AuthGuard>
      <div>
        <HeroSection
          title='Environment Dashboard'
          subtitle='Track environmental metrics, compliance, and sustainability impact for Deep Engineering projects.'
        />
        <section className='section-padding bg-white'>
          <div className='container'>
            <h2 className='mb-6 text-2xl font-bold'>Environmental Metrics</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
              <div className='bg-gray-light p-6 rounded-lg text-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Leaf className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-semibold mb-2'>CO₂ Emissions Avoided</h4>
                <div className='text-2xl font-bold text-primary'>
                  2.5M Tons/Year
                </div>
              </div>
              <div className='bg-gray-light p-6 rounded-lg text-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Globe className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-semibold mb-2'>Water Conservation</h4>
                <div className='text-2xl font-bold text-primary'>
                  Zero Consumption
                </div>
              </div>
              <div className='bg-gray-light p-6 rounded-lg text-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
                  <BarChart3 className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-semibold mb-2'>Land Footprint</h4>
                <div className='text-2xl font-bold text-primary'>300 m²/MW</div>
              </div>
              <div className='bg-gray-light p-6 rounded-lg text-center'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3'>
                  <Award className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-semibold mb-2'>Certifications</h4>
                <div className='text-2xl font-bold text-primary'>
                  TÜV, SGS, DEKRA
                </div>
              </div>
            </div>
            <div className='bg-gray-light p-8 rounded-lg text-center text-gray-500'>
              Impact assessment visualizations and compliance tracking coming
              soon.
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
