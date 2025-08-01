'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Info, ArrowRight, Zap, Droplets, Settings, Activity, Move, RotateCcw } from 'lucide-react';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  specs: string[];
  position: { x: number; y: number };
  color: string;
  bgColor: string;
  icon: React.ComponentType<any>;
}

const initialComponents: ComponentInfo[] = [
  {
    id: 'steel-tower',
    name: 'Steel Tower',
    description: 'Vertical structure containing the floater system with dual channels for continuous operation.',
    specs: ['Dual channel design', 'Continuous flow', 'Buoyancy-driven motion'],
    position: { x: 20, y: 35 },
    color: 'text-blue-700',
    bgColor: 'bg-blue-100 border-blue-300',
    icon: Activity,
  },
  {
    id: 'gear-box',
    name: 'Gear Box',
    description: 'Mechanical system that converts vertical motion into rotational energy.',
    specs: ['High efficiency', 'Low friction', 'Continuous operation'],
    position: { x: 45, y: 15 },
    color: 'text-gray-700',
    bgColor: 'bg-gray-100 border-gray-300',
    icon: Settings,
  },
  {
    id: 'generator',
    name: 'Generator',
    description: '500 kW Low-Speed Permanent Magnet Generator producing electrical power.',
    specs: ['375 RPM', '95.2% efficiency', 'Direct grid connection'],
    position: { x: 65, y: 15 },
    color: 'text-green-700',
    bgColor: 'bg-green-100 border-green-300',
    icon: Zap,
  },
  {
    id: 'compressor',
    name: 'Compressor',
    description: 'Air compression system that provides controlled buoyancy forces.',
    specs: ['10 bar pressure', 'Variable speed', 'Real-time control'],
    position: { x: 80, y: 25 },
    color: 'text-purple-700',
    bgColor: 'bg-purple-100 border-purple-300',
    icon: Droplets,
  },
];

export default function KPPSchematic() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [components, setComponents] = useState<ComponentInfo[]>(initialComponents);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (componentId: string) => {
    setDraggedComponent(componentId);
  };

  const handleDragEnd = (componentId: string, info: any) => {
    if (!diagramRef.current) return;
    
    const diagramRect = diagramRef.current.getBoundingClientRect();
    const newX = ((info.point.x - diagramRect.left) / diagramRect.width) * 100;
    const newY = ((info.point.y - diagramRect.top) / diagramRect.height) * 100;
    
    // Constrain to diagram bounds
    const constrainedX = Math.max(5, Math.min(95, newX));
    const constrainedY = Math.max(5, Math.min(95, newY));
    
    setComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, position: { x: constrainedX, y: constrainedY } }
          : comp
      )
    );
    setDraggedComponent(null);
  };

  const resetPositions = () => {
    setComponents(initialComponents);
  };

  return (
    <div className='w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-primary to-primary-dark text-white p-6'>
        <div className='text-center'>
          <h3 className='text-xl font-bold mb-2'>KPP System Schematic</h3>
          <p className='text-primary-100 text-sm'>Complete system flow diagram with interactive components</p>
        </div>
        
        {/* Edit Mode Controls */}
        <div className='flex justify-center gap-4 mt-4'>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              isEditMode 
                ? 'bg-white text-primary hover:bg-gray-100' 
                : 'bg-primary-light text-white hover:bg-primary-dark'
            }`}
          >
            <Move className='w-4 h-4' />
            {isEditMode ? 'Exit Edit Mode' : 'Edit Layout'}
          </button>
          
          {isEditMode && (
            <button
              onClick={resetPositions}
              className='px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center gap-2'
            >
              <RotateCcw className='w-4 h-4' />
              Reset Layout
            </button>
          )}
        </div>
      </div>
      
      {/* Main Diagram */}
      <div 
        ref={diagramRef}
        className='relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-[500px]'
      >
        {/* Background Grid */}
        <div className='absolute inset-0 opacity-20'>
          <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='1' />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>

        {/* Steel Tower - Enhanced */}
        <motion.div 
          className='absolute left-8 top-8 w-32 h-80 bg-blue-200 rounded-lg border-2 border-blue-400 shadow-lg'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className='text-center text-sm font-bold text-blue-800 mt-2 mb-2'>Steel Tower</div>
          
          {/* Left Channel - Floaters moving up */}
          <div className='absolute left-3 top-12 w-10 h-56 bg-blue-100 rounded border border-blue-300'>
            <div className='text-xs text-blue-700 text-center mt-1 font-semibold'>Air</div>
            {/* Floaters with animation */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                className='absolute w-8 h-5 bg-orange-400 rounded border border-orange-600 left-1 shadow-sm' 
                style={{ top: `${16 + i * 8}px` }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <div className='text-xs text-center text-orange-800 font-medium'>Floater</div>
              </motion.div>
            ))}
            <motion.div 
              className='absolute left-2 top-4 text-sm text-blue-600 font-bold'
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.div>
            <div className='absolute bottom-3 left-1 w-8 h-10 bg-blue-300 rounded border border-blue-500'>
              <div className='text-xs text-center text-blue-700 font-semibold'>Water</div>
            </div>
          </div>
          
          {/* Right Channel - Empty spaces */}
          <div className='absolute right-3 top-12 w-10 h-56 bg-blue-100 rounded border border-blue-300'>
            <div className='text-xs text-blue-700 text-center mt-1 font-semibold'>Air</div>
            <div className='absolute bottom-3 left-1 w-8 h-10 bg-blue-300 rounded border border-blue-500'>
              <div className='text-xs text-center text-blue-700 font-semibold'>Water</div>
            </div>
            <motion.div 
              className='absolute right-2 top-4 text-sm text-blue-600 font-bold'
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </div>
          
          {/* Compressed air input */}
          <motion.div 
            className='absolute bottom-0 left-12 w-8 h-3 bg-orange-400 rounded-full'
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className='absolute bottom-4 left-4 text-xs text-orange-700 font-semibold'>Compressed air</div>
          
          {/* Top rotation mechanism */}
          <div className='absolute top-0 left-12 w-8 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'>
            <motion.div 
              className='w-6 h-3 bg-blue-800 rounded-full'
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
        
        {/* Draggable Interactive Components */}
        {components.map(component => {
          const IconComponent = component.icon;
          return (
            <motion.div
              key={component.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                hoveredComponent === component.id ? 'z-20' : 'z-10'
              } ${isEditMode ? 'cursor-move' : ''}`}
              style={{
                left: `${component.position.x}%`,
                top: `${component.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: isEditMode ? 1.05 : 1.1 }}
              drag={isEditMode}
              dragMomentum={false}
              dragElastic={0.1}
              dragConstraints={diagramRef}
              onDragStart={() => handleDragStart(component.id)}
              onDragEnd={(event, info) => handleDragEnd(component.id, info)}
              onMouseEnter={() => !isEditMode && setHoveredComponent(component.id)}
              onMouseLeave={() => !isEditMode && setHoveredComponent(null)}
              onClick={() => !isEditMode && setSelectedComponent(component.id)}
            >
              {/* Component Box */}
              <motion.div
                className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center shadow-lg ${
                  hoveredComponent === component.id || selectedComponent === component.id
                    ? `${component.bgColor} scale-110 shadow-xl`
                    : `${component.bgColor}`
                } ${isEditMode ? 'border-dashed border-2' : ''}`}
              >
                <IconComponent className={`w-8 h-8 ${component.color} mb-1`} />
                <span className={`text-xs font-semibold ${component.color} text-center`}>
                  {component.name}
                </span>
                
                {/* Edit Mode Indicator */}
                {isEditMode && (
                  <div className='absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
                    <Move className='w-3 h-3 text-white' />
                  </div>
                )}
              </motion.div>

              {/* Component Label */}
              <AnimatePresence>
                {hoveredComponent === component.id && !isEditMode && (
                  <motion.div
                    className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap z-30'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='bg-primary text-white text-sm px-3 py-2 rounded-lg shadow-lg'>
                      {component.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Grid Connection */}
        <div className='absolute left-65 top-35 w-16 h-10 bg-yellow-300 rounded-full border-2 border-yellow-500 flex items-center justify-center shadow-lg'>
          <div className='text-sm font-bold text-yellow-800'>Grid</div>
        </div>
        
        {/* Air Tank */}
        <div className='absolute right-20 top-45 w-16 h-12 bg-gray-300 rounded border-2 border-gray-500 flex items-center justify-center shadow-lg'>
          <div className='text-sm font-semibold text-gray-700'>Air tank</div>
        </div>
        
        {/* Pressure Reducing Valve */}
        <div className='absolute right-20 top-65 w-12 h-8 bg-red-300 rounded border border-red-500 flex items-center justify-center shadow-lg'>
          <div className='text-xs font-semibold text-red-700'>PRV</div>
        </div>
        <div className='absolute right-20 top-75 text-xs text-red-700 font-semibold'>Pressure reducing valve</div>
        
        {/* Enhanced Connection Lines */}
        <svg className='absolute inset-0 w-full h-full pointer-events-none'>
          {/* Generator to Grid */}
          <motion.path
            d='M 65% 15% L 65% 35%'
            stroke='#059669'
            strokeWidth='3'
            strokeDasharray='5,5'
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          
          {/* Gear box to Generator */}
          <motion.path
            d='M 45% 15% L 65% 15%'
            stroke='#374151'
            strokeWidth='3'
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
          />
          
          {/* Compressor to Air Tank */}
          <motion.path
            d='M 80% 25% L 80% 45%'
            stroke='#7C3AED'
            strokeWidth='3'
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
          
          {/* Air Tank to PRV */}
          <motion.path
            d='M 80% 45% L 80% 65%'
            stroke='#7C3AED'
            strokeWidth='3'
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.9 }}
          />
          
          {/* PRV to Steel Tower */}
          <motion.path
            d='M 80% 65% Q 50% 65% 20% 65%'
            stroke='#F97316'
            strokeWidth='3'
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.1 }}
          />
        </svg>
      </div>

      {/* Component Details Panel */}
      <AnimatePresence>
        {selectedComponent && !isEditMode && (
          <motion.div
            className='bg-white border-t border-gray-200 p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const component = components.find(c => c.id === selectedComponent);
              if (!component) return null;
              const IconComponent = component.icon;

              return (
                <div>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className={`p-3 rounded-lg ${component.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${component.color}`} />
                      </div>
                      <div>
                        <h4 className='text-lg font-bold text-primary'>{component.name}</h4>
                        <p className='text-sm text-gray-600'>{component.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedComponent(null)}
                      className='text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h5 className='font-semibold text-gray-800 mb-2'>Key Specifications:</h5>
                    <ul className='space-y-1'>
                      {component.specs.map((spec, index) => (
                        <li key={index} className='text-sm text-gray-600 flex items-center'>
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

      {/* Footer */}
      <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
        <div className='text-center'>
          <p className='text-sm text-gray-600 mb-2'>
            <Info className='inline w-4 h-4 mr-1' />
            {isEditMode ? 'Drag components to rearrange • Click "Exit Edit Mode" when done' : 'Click on components for detailed information'}
          </p>
          <p className='text-xs text-gray-500'>
            Steel Tower • Floater System • Generator • Air Compression • Grid Connection
          </p>
        </div>
      </div>
    </div>
  );
} 