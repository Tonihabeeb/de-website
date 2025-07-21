'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { ReactNode, useEffect, useState } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  children,
}: HeroSectionProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mq.matches);
      mq.addEventListener('change', e => setIsReducedMotion(e.matches));
      return () =>
        mq.removeEventListener('change', e => setIsReducedMotion(e.matches));
    }
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isReducedMotion ? 0 : isMobile ? 8 : 20;

  return (
    <section className='relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-primary text-white overflow-hidden'>
      {/* Animated background particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {!isReducedMotion &&
          [...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white/20 rounded-full'
              style={{ willChange: 'transform, opacity' }}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 400),
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
      </div>
      {/* Floating geometric shapes */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full'
          style={{ willChange: 'transform' }}
          animate={
            isReducedMotion
              ? {}
              : {
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute bottom-20 right-20 w-24 h-24 border border-white/10 transform rotate-45'
          style={{ willChange: 'transform' }}
          animate={
            isReducedMotion
              ? {}
              : {
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      <div className='container relative z-10 text-center'>
        <div className='max-w-4xl mx-auto'>
          {/* Main Tagline */}
          <motion.h1
            className='text-hero lg:text-hero-lg font-serif font-bold mb-6 leading-tight text-white drop-shadow-md'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>
          {/* Subtagline */}
          <motion.p
            className='text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
          {children}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
        style={{ willChange: 'transform' }}
        animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className='w-6 h-6 text-white/70'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </motion.div>
    </section>
  );
}
