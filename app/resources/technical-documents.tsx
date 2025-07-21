import React from 'react';
import HeroSection from '@/components/sections/HeroSection';

export default function TechnicalDocumentsPage() {
  return (
    <div>
      <HeroSection
        title='Technical Documents'
        subtitle='Access KPP technical specifications, engineering drawings, and component documentation.'
      />
      <section className='section-padding bg-white'>
        <div className='container'>
          <h2 className='mb-6 text-2xl font-bold'>KPP Technical Documents</h2>
          <p className='text-gray-text mb-8 max-w-2xl'>
            Browse and download technical specifications, engineering drawings,
            and performance data for the Kinetic Power Plant and its components.
          </p>
          {/* Placeholder for document list and search/filter features */}
          <div className='bg-gray-light p-8 rounded-lg text-center text-gray-500'>
            Document list and search/filter features coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}
