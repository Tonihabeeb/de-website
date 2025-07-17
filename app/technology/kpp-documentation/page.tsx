import { FileText, BarChart3, BookOpen, Layers, Search } from 'lucide-react';

export default function KPPDocumentationPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-8 h-8 text-blue-600" />
        KPP Technical Documentation
      </h1>
      <p className="mb-8 text-gray-700">
        Comprehensive technical documentation for the Kinetic Power Plant (KPP) project, including specifications, engineering diagrams, performance metrics, and interactive component explorer.
      </p>

      {/* Component Specifications Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Layers className="w-6 h-6 text-green-600" />
          Component Specifications
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Component specifications from KPP technical documents will be displayed here.</em>
        </div>
      </section>

      {/* Engineering Diagrams Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <BookOpen className="w-6 h-6 text-purple-600" />
          Engineering Diagrams & Blueprints
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Engineering diagrams and blueprints will be embedded or linked here.</em>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-orange-600" />
          Performance Metrics & Analysis
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Performance metrics, charts, and analysis will be visualized here.</em>
        </div>
      </section>

      {/* Technical Specifications Database Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Technical Specifications Database
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Structured technical data and downloadable documents will be available here.</em>
        </div>
      </section>

      {/* Interactive Component Explorer Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Search className="w-6 h-6 text-pink-600" />
          Interactive Component Explorer
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Interactive explorer for KPP components will be implemented here.</em>
        </div>
      </section>
    </main>
  );
} 