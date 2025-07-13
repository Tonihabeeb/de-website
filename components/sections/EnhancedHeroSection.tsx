import React from 'react';
import KPPHeroAnimation from '../animations/KPPHeroAnimation';

export default function EnhancedHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[70vh] flex items-center justify-center">
      {/* KPP Animation Background */}
      <KPPHeroAnimation />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
          Kinetic Power Plant: <span className="text-blue-600">The Future of Clean Energy</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Zero emissions. 24/7 reliability. Proven performance. Unlocking sustainable energy for a brighter tomorrow.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="bg-white/80 rounded-lg px-6 py-4 shadow-md flex flex-col items-center min-w-[120px]">
            <span className="text-3xl font-bold text-blue-600">300 MW+</span>
            <span className="text-gray-600 text-sm mt-1">Installed</span>
          </div>
          <div className="bg-white/80 rounded-lg px-6 py-4 shadow-md flex flex-col items-center min-w-[120px]">
            <span className="text-3xl font-bold text-green-600">0</span>
            <span className="text-gray-600 text-sm mt-1">Emissions</span>
          </div>
          <div className="bg-white/80 rounded-lg px-6 py-4 shadow-md flex flex-col items-center min-w-[120px]">
            <span className="text-3xl font-bold text-indigo-600">95.2%</span>
            <span className="text-gray-600 text-sm mt-1">Efficiency</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/technology"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            Learn More
          </a>
          <a
            href="/contact"
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
          <a
            href="/projects"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition-colors"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
} 