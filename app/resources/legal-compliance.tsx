import React from 'react';
import HeroSection from '@/components/sections/HeroSection';

export default function LegalComplianceDocumentsPage() {
  return (
    <div>
      <HeroSection
        title='Legal & Compliance Documents'
        subtitle='Access government contracts, legal documentation, regulatory compliance, and insurance documents.'
      />
      <section className='section-padding bg-white'>
        <div className='container'>
          <h2 className='mb-6 text-2xl font-bold'>
            Legal & Compliance Documents
          </h2>
          <p className="text-white">
            Browse and download legal documents, government contracts,
            regulatory compliance files, and insurance/guarantee documents for
            Deep Engineering projects.
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
