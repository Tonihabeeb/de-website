'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trackDiagramInteraction } from '@/components/Analytics';
import { 
  Zap, 
  Droplets, 
  Cog, 
  Activity, 
  Waves, 
  Settings,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Cylinder
} from 'lucide-react';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  specs: string[];
  position: { x: number; y: number };
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface KPPDiagramProps {
  className?: string;
}

const components: ComponentInfo[] = [
  {
    id: 'air-injection',
    name: 'Air Injection Engine',
    description:
      'Precision air control system that injects compressed air into underwater floaters.',
    specs: ['10 bar pressure', '1.2-1.5 m³/min flow', 'Variable speed control'],
    position: { x: 20, y: 30 },
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 border-blue-300',
  },
  {
    id: 'floaters',
    name: 'Floater System',
    description:
      'Buoyant floaters that rise and fall, driving the chain mechanism.',
    specs: ['800mm diameter', '4,700kg weight', 'High-density materials'],
    position: { x: 50, y: 40 },
    icon: Waves,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100 border-cyan-300',
  },
  {
    id: 'chain-system',
    name: 'Chain Mechanism',
    description:
      'Converts vertical motion into rotational energy with high efficiency.',
    specs: [
      'Continuous operation',
      'Low friction design',
      'Durable construction',
    ],
    position: { x: 80, y: 50 },
    icon: Cog,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 border-orange-300',
  },
  {
    id: 'generator',
    name: '500 kW Generator',
    description:
      'Low-speed permanent magnet generator with direct grid connection.',
    specs: ['375 RPM', '95.2% efficiency', 'No gearbox required'],
    position: { x: 50, y: 70 },
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 border-yellow-300',
  },
  {
    id: 'water-tank',
    name: 'Water Tank',
    description:
      'Contained environment where floaters operate with minimal water loss.',
    specs: [
      '<5% annual top-up',
      'Efficient heat management',
      'Environmental protection',
    ],
    position: { x: 20, y: 60 },
    icon: Cylinder,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 border-blue-300',
  },
  {
    id: 'control-system',
    name: 'SCADA Control',
    description:
      'Integrated monitoring and control system for optimal performance.',
    specs: [
      'Real-time monitoring',
      'Automated optimization',
      'Remote operation',
    ],
    position: { x: 80, y: 30 },
    icon: Settings,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 border-purple-300',
  },
];

export default function KPPDiagram({ className = '' }: KPPDiagramProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Diagram Container */}
      <div className='relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200'>
        {/* System Overview Title */}
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-bold text-primary mb-2'>
            KPP System Overview
          </h3>
          <p className='text-gray-text'>
            Interactive diagram showing key components and their relationships
          </p>
        </div>

        {/* Main Diagram Area */}
        <div className='relative h-96 bg-white rounded-xl border border-gray-200 overflow-hidden'>
          {/* Background Grid */}
          <div className='absolute inset-0 opacity-10'>
            <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern
                  id='grid'
                  width='20'
                  height='20'
                  patternUnits='userSpaceOnUse'
                >
                  <path
                    d='M 20 0 L 0 0 0 20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1'
                  />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
            </svg>
          </div>

          {/* Water Tank Background */}
          <motion.div
            className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-200 to-blue-100'
            initial={{ height: 0 }}
            animate={{ height: '50%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Component Nodes */}
          {components.map(component => {
            const IconComponent = component.icon;
            return (
              <motion.div
                key={component.id}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  hoveredComponent === component.id ? 'z-20' : 'z-10'
                }`}
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform, opacity',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }
                }
                transition={{
                  duration: 0.5,
                  delay: components.indexOf(component) * 0.1,
                }}
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
                {/* Component Box */}
                <motion.div
                  className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center ${
                    hoveredComponent === component.id ||
                    selectedComponent === component.id
                      ? `${component.bgColor} scale-110 shadow-lg`
                      : `${component.bgColor}`
                  }`}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <IconComponent className={`w-6 h-6 ${component.color}`} />
                  <span className={`text-xs font-medium mt-1 ${component.color}`}>
                    {component.id === 'water-tank' ? 'Tank' : component.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Component Label */}
                <motion.div
                  className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: hoveredComponent === component.id ? 1 : 0,
                    y: hoveredComponent === component.id ? 0 : -10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='bg-primary text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap shadow-lg'>
                    {component.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Connection Lines with Arrows */}
          <svg className='absolute inset-0 w-full h-full pointer-events-none'>
            {/* Air Injection to Floaters */}
            <motion.path
              d='M 28% 30% Q 35% 35% 42% 40%'
              stroke='#3B82F6'
              strokeWidth='3'
              fill='none'
              markerEnd='url(#arrowhead)'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            
            {/* Floaters to Chain */}
            <motion.path
              d='M 58% 40% Q 65% 45% 72% 50%'
              stroke='#1D4ED8'
              strokeWidth='3'
              fill='none'
              markerEnd='url(#arrowhead)'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
            />
            
            {/* Chain to Generator */}
            <motion.path
              d='M 88% 50% Q 75% 60% 58% 70%'
              stroke='#1E40AF'
              strokeWidth='3'
              fill='none'
              markerEnd='url(#arrowhead)'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            
            {/* Generator to Water Tank */}
            <motion.path
              d='M 42% 70% Q 35% 65% 28% 60%'
              stroke='#3B82F6'
              strokeWidth='3'
              fill='none'
              markerEnd='url(#arrowhead)'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />

            {/* Control System Connections */}
            <motion.path
              d='M 72% 30% Q 65% 35% 58% 40%'
              stroke='#8B5CF6'
              strokeWidth='2'
              strokeDasharray='5,5'
              fill='none'
              markerEnd='url(#arrowhead)'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            />

            {/* Arrow Marker Definition */}
            <defs>
              <marker
                id='arrowhead'
                markerWidth='10'
                markerHeight='7'
                refX='9'
                refY='3.5'
                orient='auto'
              >
                <polygon
                  points='0 0, 10 3.5, 0 7'
                  fill='currentColor'
                />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Component Details Panel */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              className='mt-6 bg-white rounded-xl p-6 border border-gray-200'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const component = components.find(
                  c => c.id === selectedComponent
                );
                if (!component) return null;
                const IconComponent = component.icon;

                return (
                  <div>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <div className={`p-2 rounded-lg ${component.bgColor}`}>
                          <IconComponent className={`w-6 h-6 ${component.color}`} />
                        </div>
                        <h4 className='text-xl font-bold text-primary'>
                          {component.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedComponent(null)}
                        className='text-gray-400 hover:text-gray-text transition-colors'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                    <p className='text-gray-text mb-4'>
                      {component.description}
                    </p>
                    <div>
                      <h5 className='font-semibold text-gray-800 mb-2'>
                        Key Specifications:
                      </h5>
                      <ul className='space-y-1'>
                        {component.specs.map((spec, index) => (
                          <li
                            key={index}
                            className='text-base text-gray-text flex items-center'
                          >
                            <span className='w-2 h-2 bg-primary rounded-full mr-2'></span>
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
        <div className='mt-4 text-center text-base text-gray-text'>
          <p>
            Hover over components to see labels • Click for detailed information
          </p>
        </div>
      </div>
    </div>
  );
}
