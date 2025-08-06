'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { trackDiagramInteraction } from '@/components/Analytics';
import { Zap, Wind, ArrowUp, Settings } from 'lucide-react';

interface KPPAnimationProps {
  className?: string;
  autoPlay?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function KPPAnimation({
  className = '',
  autoPlay = true,
  speed = 'normal',
}: KPPAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  const speedMultiplier = {
    slow: 2,
    normal: 1,
    fast: 0.5,
  }[speed];

  const animationSequence = async () => {
    if (!isPlaying) return;

    while (isPlaying) {
      // Air injection phase
      await controls.start({
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: { duration: 2 * speedMultiplier, ease: 'easeInOut' },
      });

      // Floater rise phase
      await controls.start({
        y: [0, -100],
        rotate: [0, 360],
        transition: { duration: 3 * speedMultiplier, ease: 'easeInOut' },
      });

      // Energy conversion phase
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 1.5 * speedMultiplier, ease: 'easeInOut' },
      });

      // Air release and sink phase
      await controls.start({
        y: [-100, 0],
        rotate: [360, 720],
        transition: { duration: 3 * speedMultiplier, ease: 'easeInOut' },
      });

      // Brief pause before next cycle
      await new Promise(resolve => setTimeout(resolve, 500 * speedMultiplier));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationSequence();
    }
  }, [isPlaying, speed]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    trackDiagramInteraction('animation', isPlaying ? 'pause' : 'play');
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} style={{ minHeight: 320 }}>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg mx-auto mt-16 text-white">
          <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
            <span className='text-blue-600 text-2xl'>⚡</span>
          </div>
        </div>
        <div className="text-center mt-2 text-base font-semibold text-white">
          Floater (Animation Reduced)
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Animation Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 text-white">
        {/* Title and Controls */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-2xl font-bold text-primary mb-2'>
              KPP Animation
            </h3>
            <p className="text-white">
              Watch the complete energy generation cycle
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <span className="text-sm text-white">Speed:</span>
              <select
                value={speed}
                onChange={e => window.location.reload()} // Simple reload for demo
                className='text-sm border border-gray-300 rounded px-2 py-1'
              >
                <option value='slow'>Slow</option>
                <option value='normal'>Normal</option>
                <option value='fast'>Fast</option>
              </select>
            </div>
            <button
              onClick={toggleAnimation}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* Main Animation Area */}
        <div className='relative h-96 bg-white rounded-xl border border-gray-200 overflow-hidden'>
          {/* Water Tank Background */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-200 to-blue-100 text-white">
            {/* Water Surface Effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-blue-300/50 text-white"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 * speedMultiplier,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Air Injection System */}
          <motion.div
            className='absolute top-4 left-1/2 transform -translate-x-1/2'
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2 * speedMultiplier,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
                <Wind className='w-8 h-8 text-white' />
              </div>
            </div>
            <div className='text-center mt-2'>
              <div className='flex items-center justify-center space-x-2 text-white text-sm'>
                <Wind className='w-4 h-4' />
                <span>Air Injection</span>
              </div>
            </div>
          </motion.div>

          {/* Air Bubbles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full text-white"
              style={{
                willChange: 'transform, opacity',
                left: `${45 + i * 2}%`,
                bottom: '50%',
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 * speedMultiplier,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Main Floater */}
          <motion.div
            className='absolute left-1/2 transform -translate-x-1/2'
            style={{ willChange: 'transform, opacity', bottom: '50%' }}
            animate={controls}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg text-white">
              <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                <Zap className='w-12 h-12 text-white' />
              </div>
            </div>
            <div className='text-center mt-2'>
              <div className='flex items-center justify-center space-x-2 text-white text-sm'>
                <ArrowUp className='w-4 h-4' />
                <span>Buoyancy</span>
              </div>
            </div>
          </motion.div>

          {/* Chain System */}
          <motion.div
            className='absolute right-8 top-1/2 transform -translate-y-1/2'
            style={{ willChange: 'transform, opacity' }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 * speedMultiplier,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className='w-16 h-16 border-4 border-gray-600 rounded-full flex items-center justify-center'>
              <div className='w-8 h-8 bg-gray-600 rounded-full'></div>
            </div>
            <div className='text-center mt-2'>
              <div className='flex items-center justify-center space-x-2 text-white text-sm'>
                <Settings className='w-4 h-4' />
                <span>Conversion</span>
              </div>
            </div>
          </motion.div>

          {/* Generator */}
          <motion.div
            className='absolute right-8 bottom-4'
            style={{ willChange: 'transform, opacity' }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2 * speedMultiplier,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white">
              <Zap className='w-16 h-16 text-white' />
            </div>
            <div className='text-center mt-2'>
              <div className='flex items-center justify-center space-x-2 text-white text-sm'>
                <Zap className='w-4 h-4' />
                <span>Power</span>
              </div>
            </div>
          </motion.div>

          {/* Energy Flow Lines */}
          <svg className='absolute inset-0 w-full h-full pointer-events-none'>
            <motion.path
              d='M 50% 50% Q 70% 40% 85% 50%'
              stroke='url(#energyGradient)'
              strokeWidth='3'
              fill='none'
              strokeDasharray='5,5'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 1, 0],
                strokeDashoffset: [0, -10],
              }}
              transition={{
                duration: 2 * speedMultiplier,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <defs>
              <linearGradient
                id='energyGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#10B981' stopOpacity='0' />
                <stop offset='50%' stopColor='#10B981' stopOpacity='1' />
                <stop offset='100%' stopColor='#10B981' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>

          {/* Energy Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-green-400 rounded-full'
              style={{
                willChange: 'transform, opacity',
                left: `${50 + i * 4}%`,
                top: `${50 + Math.sin(i) * 10}%`,
              }}
              animate={{
                x: [0, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 * speedMultiplier,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Animation Legend */}
        <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white">
              <Wind className='w-8 h-8 text-white' />
            </div>
            <p className="text-xs text-white">Air Injection</p>
          </div>
          <div className='text-center'>
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white">
              <ArrowUp className='w-8 h-8 text-white' />
            </div>
            <p className="text-xs text-white">Floater Rise</p>
          </div>
          <div className='text-center'>
            <div className='w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center'>
              <Settings className='w-8 h-8 text-white' />
            </div>
            <p className="text-xs text-white">Chain Drive</p>
          </div>
          <div className='text-center'>
            <div className='w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center'>
              <Zap className='w-8 h-8 text-white' />
            </div>
            <p className="text-xs text-white">Power Output</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className='mt-4 text-center'>
          <div className='inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2'>
            <div
              className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-red-500'}`}
            ></div>
            <span className="text-sm text-white">
              {isPlaying ? 'Animation Running' : 'Animation Paused'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
