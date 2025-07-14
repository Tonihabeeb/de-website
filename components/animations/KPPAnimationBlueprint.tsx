'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface KPPAnimationBlueprintProps {
  className?: string;
  showLabels?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

export default function KPPAnimationBlueprint({ 
  className = '', 
  showLabels = true,
  animationSpeed = 'normal'
}: KPPAnimationBlueprintProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const speedMultiplier = {
    slow: 0.5,
    normal: 1,
    fast: 2
  }[animationSpeed];

  if (shouldReduceMotion) {
    return (
      <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-600">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60A5FA" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
            </svg>
          </div>
          <div className="relative z-10 text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">KPP Technical Schematic</h3>
            <p className="text-blue-300 text-base">Professional engineering blueprint view (Animation Reduced)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Blueprint Container */}
      <div 
        className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-600"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60A5FA" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
          </svg>
        </div>

        {/* Title */}
        <div className="relative z-10 text-center mb-8">
          <h3 className="text-2xl font-bold text-blue-400 mb-2">KPP Technical Schematic</h3>
          <p className="text-blue-300 text-sm">Professional engineering blueprint view</p>
        </div>

        {/* Main Schematic Area */}
        <div className="relative h-96 bg-slate-800/50 rounded-xl border border-slate-600 overflow-hidden">
          {/* Water Tank Outline */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-48 border-2 border-blue-400 rounded-t-full"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 * speedMultiplier, delay: 0.5 }}
            style={{ willChange: 'transform, opacity' }}
          />

          {/* Air Injection System - Blueprint Style */}
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 * speedMultiplier,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Compressor Symbol */}
            <div className="w-16 h-16 border-2 border-blue-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-blue-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Technical Label */}
            {showLabels && (
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-blue-400 font-mono">AIR COMPRESSOR</p>
                <p className="text-xs text-blue-300">10 bar / 1.2-1.5 m³/min</p>
              </motion.div>
            )}
          </motion.div>

          {/* Air Flow Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 50% 8% Q 50% 25% 50% 40%"
              stroke="#60A5FA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 1, 0],
                strokeDashoffset: [0, -10]
              }}
              transition={{
                duration: 3 * speedMultiplier,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* Floater System - Blueprint Style */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ willChange: 'transform, opacity', bottom: '50%' }}
            animate={{
              y: [0, -60, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 * speedMultiplier,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Floater Symbol */}
            <div className="w-20 h-20 border-2 border-blue-400 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border border-blue-400 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Technical Label */}
            {showLabels && (
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-blue-400 font-mono">FLOATER</p>
                <p className="text-xs text-blue-300">800mm Ø / 4,700kg</p>
              </motion.div>
            )}
          </motion.div>

          {/* Chain System - Blueprint Style */}
          <motion.div
            className="absolute right-8 top-1/2 transform -translate-y-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 * speedMultiplier,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Chain Symbol */}
            <div className="w-16 h-16 border-2 border-blue-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-blue-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border border-blue-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Technical Label */}
            {showLabels && (
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-blue-400 font-mono">CHAIN DRIVE</p>
                <p className="text-xs text-blue-300">Continuous / Low Friction</p>
              </motion.div>
            )}
          </motion.div>

          {/* Generator - Blueprint Style */}
          <motion.div
            className="absolute right-8 bottom-4"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2 * speedMultiplier,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Generator Symbol */}
            <div className="w-16 h-16 border-2 border-green-400 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 border border-green-400 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
              </div>
            </div>
            
            {/* Technical Label */}
            {showLabels && (
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-green-400 font-mono">GENERATOR</p>
                <p className="text-xs text-green-300">500 kW / 375 RPM</p>
              </motion.div>
            )}
          </motion.div>

          {/* Energy Flow Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 50% 50% Q 70% 45% 85% 50%"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8,4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 1, 0],
                strokeDashoffset: [0, -12]
              }}
              transition={{
                duration: 2 * speedMultiplier,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* Measurement Lines and Labels */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Water Level Indicator */}
            <motion.line
              x1="10%"
              y1="50%"
              x2="15%"
              y2="50%"
              stroke="#60A5FA"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 * speedMultiplier, delay: 1 }}
            />
            <motion.text
              x="5%"
              y="48%"
              fill="#60A5FA"
              fontSize="10"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 * speedMultiplier, delay: 1.5 }}
            >
              WATER LEVEL
            </motion.text>

            {/* Power Output Indicator */}
            <motion.line
              x1="85%"
              y1="80%"
              x2="90%"
              y2="80%"
              stroke="#10B981"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 * speedMultiplier, delay: 2 }}
            />
            <motion.text
              x="92%"
              y="82%"
              fill="#10B981"
              fontSize="10"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 * speedMultiplier, delay: 2.5 }}
            >
              POWER OUT
            </motion.text>
          </svg>

          {/* Technical Specifications Panel */}
          <motion.div
            className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 * speedMultiplier, delay: 3 }}
          >
            <h4 className="text-sm font-bold text-blue-400 mb-2 font-mono">SPECIFICATIONS</h4>
            <div className="space-y-1 text-xs text-blue-300 font-mono">
              <div>• Efficiency: 95.2%</div>
              <div>• Water Loss: &lt;5%/year</div>
              <div>• Operating Temp: 90-130°C</div>
              <div>• Protection: IP54</div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-600"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 * speedMultiplier, delay: 3.5 }}
          >
            <h4 className="text-sm font-bold text-green-400 mb-2 font-mono">PERFORMANCE</h4>
            <div className="space-y-1 text-xs text-green-300 font-mono">
              <div>• Output: 500 kW</div>
              <div>• Speed: 375 RPM</div>
              <div>• Availability: 100%</div>
              <div>• Emissions: 0</div>
            </div>
          </motion.div>
        </div>

        {/* Blueprint Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 border border-blue-400 rounded-full"></div>
            </div>
            <p className="text-xs text-blue-400 font-mono">COMPRESSOR</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            </div>
            <p className="text-xs text-blue-400 font-mono">FLOATER</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 border border-blue-400 rounded-full"></div>
            </div>
            <p className="text-xs text-blue-400 font-mono">CHAIN</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
            </div>
            <p className="text-xs text-green-400 font-mono">GENERATOR</p>
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className="mt-4 text-center">
          <p className="text-xs text-blue-300 font-mono">
            Hover for technical details • Blueprint view for engineering reference
          </p>
        </div>
      </div>
    </div>
  );
} 