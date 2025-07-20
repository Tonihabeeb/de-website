import React from 'react';
import HeroSection from '@/components/sections/HeroSection';

export default function EnvironmentalESGDocumentsPage() {
  return (
    <div>
      <HeroSection
        title="Environmental & ESG Documents"
        subtitle="Access EIA reports, ESG policy, environmental compliance, and sustainability reports."
      />
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold">Environmental & ESG Documents</h2>
          <p className="text-gray-text mb-8 max-w-2xl">Browse and download environmental impact assessments, ESG policy documents, compliance files, and sustainability reports for Deep Engineering projects.</p>
          {/* Placeholder for document list and search/filter features */}
          <div className="bg-gray-light p-8 rounded-lg text-center text-gray-500">
            Document list and search/filter features coming soon.
          </div>
        </div>
      </section>
    </div>
  );
} 