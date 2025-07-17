import { BookOpen, Search, Folder, FileText, Upload } from 'lucide-react';
import SearchSystem from '@/components/documentation/SearchSystem';
import DocumentViewer from '@/components/documentation/DocumentViewer';
import UploadSystem from '@/components/documentation/UploadSystem';
import HeroSection from '@/components/sections/HeroSection';

export default function ResourcesPage() {
  return (
    <>
      <HeroSection
        title="Project Document Management"
        subtitle="Centralized access to all technical, business, legal, and environmental documents for KPP projects. Search, filter, preview, and manage your project documentation here."
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Project Document Management
        </h1>
        <p className="mb-8 text-gray-700">
          Centralized access to all technical, business, legal, and environmental documents for KPP projects. Search, filter, preview, and manage your project documentation here.
        </p>

        {/* Search & Filter Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Search className="w-6 h-6 text-green-600" />
            Search & Filter
          </h2>
          <div className="bg-gray-50 border rounded p-4 text-gray-600">
            <SearchSystem />
          </div>
        </section>

        {/* Document Categories Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Folder className="w-6 h-6 text-orange-600" />
            Document Categories
          </h2>
          <div className="bg-gray-50 border rounded p-4 text-gray-600">
            <em>Technical, business, legal, and environmental document categories will be listed here.</em>
          </div>
        </section>

        {/* Document Preview Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Document Preview
          </h2>
          <div className="bg-gray-50 border rounded p-4 text-gray-600">
            <DocumentViewer />
          </div>
        </section>

        {/* Upload Area Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Upload className="w-6 h-6 text-pink-600" />
            Upload Documents
          </h2>
          <div className="bg-gray-50 border rounded p-4 text-gray-600">
            <UploadSystem />
          </div>
        </section>
      </main>
    </>
  );
} 