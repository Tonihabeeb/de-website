import React from 'react';
import HeroSection from '@/components/sections/HeroSection';

export default function BusinessDocumentsPage() {
  return (
    <div>
      <HeroSection
        title='Business Documents'
        subtitle='Access business plans, executive summaries, financial projections, and feasibility studies.'
      />
      <section className='section-padding bg-white'>
        <div className='container'>
          <h2 className='mb-6 text-2xl font-bold'>Business Documents</h2>
          <p className="text-white">
            Browse and download business plans, executive summaries, financial
            projections, and feasibility studies for Deep Engineering projects.
          </p>
          {/* Placeholder for document list and search/filter features */}
          <div className="bg-gray-light p-8 rounded-lg text-center text-white">
            Document list and search/filter features coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}
