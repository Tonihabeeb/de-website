'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeHeroSection() {
  // Generate deterministic random positions for particles and animated elements
  const energyParticles = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );
  const floatingPlatforms = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        left: `${20 + i * 20}%`,
        top: `${30 + (i % 2) * 20}%`,
        duration: 6 + i,
        delay: i * 0.5,
      })),
    []
  );
  const energyFlowLines = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        left: `${15 + i * 15}%`,
        delay: i * 0.3,
      })),
    []
  );

  return (
    <section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-green-100 text-primary overflow-hidden'>
      {/* KPP-inspired mechanical background animations */}
      <div className='absolute inset-0 pointer-events-none z-0'>
        {/* Rotating gear system - representing KPP mechanical components */}
        <motion.div
          className='absolute top-20 left-20 w-32 h-32 border-4 border-sky-300/40 rounded-full'
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Gear teeth */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-4 h-8 bg-sky-300/30 rounded-full'
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
                transformOrigin: 'center 20px',
              }}
            />
          ))}
        </motion.div>

        {/* Floating energy particles - representing power generation */}
        {energyParticles.map((pos, i) => (
          <motion.div
            key={i}
            className='absolute w-3 h-3 bg-green-400/40 rounded-full'
            style={{ left: pos.left, top: pos.top }}
            animate={{
              y: [0, -30, 0],
              x: [0, pos.x, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Conveyor-like movement - representing KPP's continuous operation */}
        <motion.div
          className='absolute bottom-32 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-sky-300/20 to-transparent'
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing energy core - representing the heart of KPP */}
        <motion.div
          className='absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-sky-400/20 to-green-400/20 rounded-full'
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Rotating mechanical arms - representing KPP's moving parts */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-20 bg-sky-300/30'
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center 10px',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          >
            <motion.div
              className='absolute top-0 left-1/2 w-4 h-4 bg-sky-400/40 rounded-full'
              style={{ transform: 'translateX(-50%)' }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          </motion.div>
        ))}

        {/* Floating platform elements - representing KPP's buoyancy system */}
        {floatingPlatforms.map((pos, i) => (
          <motion.div
            key={i}
            className='absolute w-16 h-8 bg-white/20 rounded-full border border-sky-200/30'
            style={{ left: pos.left, top: pos.top }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pos.delay,
            }}
          />
        ))}

        {/* Energy flow lines - representing power transmission */}
        {energyFlowLines.map((pos, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-16 bg-gradient-to-b from-transparent via-green-400/30 to-transparent'
            style={{ left: pos.left, top: '20%' }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pos.delay,
            }}
          />
        ))}

        {/* Rotating outer ring - representing KPP's circular motion */}
        <motion.div
          className='absolute top-1/2 left-1/2 w-80 h-80 border-2 border-dashed border-sky-300/20 rounded-full'
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Kinetic energy waves - representing continuous power generation */}
        <motion.div
          className='absolute bottom-20 left-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent'
          style={{ transform: 'translateX(-50%)' }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Enhanced content with staggered animations */}
      <div className='container relative z-10 text-center'>
        <motion.h1
          className='text-4xl md:text-6xl font-extrabold font-serif mb-6 leading-tight drop-shadow-xl text-primary'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Continuous Clean Energy, Anywhere
        </motion.h1>
        <motion.p
          className='text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg text-primary/80'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Delivering 24/7 renewable power through the revolutionary Kinetic
          Power Plant (KPP) technology – no fuel, no emissions.
        </motion.p>
        <motion.div
          className='flex flex-col sm:flex-row gap-4 justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href='/technology'
              className='inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-sky-100 transition-colors shadow-lg hover:shadow-xl'
            >
              Explore Our Technology
              <svg
                className='ml-2 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href='/about/learn-more'
              className='inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg bg-white hover:bg-green-100 hover:text-primary focus:text-primary transition-colors shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary'
              style={{
                transition: 'color 0.2s, background 0.2s, transform 0.2s',
              }}
            >
              Learn more about us
              <svg
                className='ml-2 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
