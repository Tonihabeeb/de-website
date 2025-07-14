'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trackDiagramInteraction } from '@/components/Analytics';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  specs: string[];
  position: { x: number; y: number };
}

interface KPPDiagramProps {
  className?: string;
}

const components: ComponentInfo[] = [
  {
    id: 'air-injection',
    name: 'Air Injection Engine',
    description: 'Precision air control system that injects compressed air into underwater floaters.',
    specs: ['10 bar pressure', '1.2-1.5 m³/min flow', 'Variable speed control'],
    position: { x: 20, y: 30 }
  },
  {
    id: 'floaters',
    name: 'Floater System',
    description: 'Buoyant floaters that rise and fall, driving the chain mechanism.',
    specs: ['800mm diameter', '4,700kg weight', 'High-density materials'],
    position: { x: 50, y: 40 }
  },
  {
    id: 'chain-system',
    name: 'Chain Mechanism',
    description: 'Converts vertical motion into rotational energy with high efficiency.',
    specs: ['Continuous operation', 'Low friction design', 'Durable construction'],
    position: { x: 80, y: 50 }
  },
  {
    id: 'generator',
    name: '500 kW Generator',
    description: 'Low-speed permanent magnet generator with direct grid connection.',
    specs: ['375 RPM', '95.2% efficiency', 'No gearbox required'],
    position: { x: 50, y: 70 }
  },
  {
    id: 'water-tank',
    name: 'Water Tank',
    description: 'Contained environment where floaters operate with minimal water loss.',
    specs: ['<5% annual top-up', 'Efficient heat management', 'Environmental protection'],
    position: { x: 20, y: 60 }
  },
  {
    id: 'control-system',
    name: 'SCADA Control',
    description: 'Integrated monitoring and control system for optimal performance.',
    specs: ['Real-time monitoring', 'Automated optimization', 'Remote operation'],
    position: { x: 80, y: 30 }
  }
];

export default function KPPDiagram({ className = '' }: KPPDiagramProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Diagram Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        {/* System Overview Title */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">KPP System Overview</h3>
          <p className="text-gray-600">Interactive diagram showing key components and their relationships</p>
        </div>

        {/* Main Diagram Area */}
        <div className="relative h-96 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Water Tank Background */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-200 to-blue-100"
            initial={{ height: 0 }}
            animate={{ height: '50%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Component Nodes */}
          {components.map((component) => (
            <motion.div
              key={component.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                hoveredComponent === component.id ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${component.position.x}%`,
                top: `${component.position.y}%`,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: components.indexOf(component) * 0.1 }}
              onMouseEnter={() => {
                setHoveredComponent(component.id);
                trackDiagramInteraction('system_overview', 'hover');
              }}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => {
                setSelectedComponent(component.id);
                trackDiagramInteraction('system_overview', 'click');
              }}
            >
              {/* Component Circle */}
              <motion.div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-white font-bold text-base ${
                  hoveredComponent === component.id || selectedComponent === component.id
                    ? 'bg-primary border-primary-dark scale-110 shadow-lg'
                    : 'bg-primary border-primary-light'
                }`}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                style={{ willChange: 'transform, opacity' }}
              >
                {component.name.charAt(0)}
              </motion.div>

              {/* Component Label */}
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: hoveredComponent === component.id ? 1 : 0,
                  y: hoveredComponent === component.id ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-primary text-white text-base px-2 py-1 rounded whitespace-nowrap">
                  {component.name}
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 20% 30% Q 35% 35% 50% 40%"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.path
              d="M 50% 40% Q 65% 45% 80% 50%"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
            />
            <motion.path
              d="M 80% 50% Q 65% 60% 50% 70%"
              stroke="url(#gradient3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.path
              d="M 50% 70% Q 35% 65% 20% 60%"
              stroke="url(#gradient4)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="1" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Component Details Panel */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              className="mt-6 bg-white rounded-xl p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const component = components.find(c => c.id === selectedComponent);
                if (!component) return null;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-primary">{component.name}</h4>
                      <button
                        onClick={() => setSelectedComponent(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{component.description}</p>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Key Specifications:</h5>
                      <ul className="space-y-1">
                        {component.specs.map((spec, index) => (
                          <li key={index} className="text-base text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="mt-4 text-center text-base text-gray-500">
          <p>Hover over components to see labels • Click for detailed information</p>
        </div>
      </div>
    </div>
  );
} 