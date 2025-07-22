'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Zap,
  ArrowUp,
  RotateCcw,
  RefreshCw,
  Lightbulb,
  Settings,
  BarChart3,
  Cpu,
  Gauge,
  Target,
  Shield,
  Wrench,
} from 'lucide-react';

interface ScrollTriggeredDiagramProps {
  steps: Array<{
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export default function ScrollTriggeredDiagram({
  steps,
}: ScrollTriggeredDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className='relative py-16'>
      {/* Background grid pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #18335A 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className='relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
          {/* Connection Lines */}
          <motion.div
            className='hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transform -translate-y-1/2 z-0'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-primary-light rounded-full opacity-20'
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Separate component for each step card
function StepCard({ step, index }: { step: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // On mobile, toggle expanded on click; on desktop, always expanded
  const handleToggle = () => {
    if (isMobile) setExpanded(e => !e);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-200 cursor-pointer ${
        expanded || !isMobile ? 'ring-2 ring-primary' : ''
      }`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.8 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: 'easeOut',
      }}
      whileHover={{ y: -5 }}
      tabIndex={0}
      role='button'
      aria-expanded={expanded || !isMobile}
      aria-label={step.title}
      onClick={handleToggle}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleToggle();
      }}
    >
      {/* Step Circle with Icon */}
      <motion.div
        className='w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 relative shadow-lg'
        initial={{ scale: 0, rotate: 0 }}
        animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2 + 0.1,
          ease: 'backOut',
        }}
        aria-hidden='true'
      >
        {step.icon}
        <div className='absolute inset-0 bg-gradient-to-br from-primary-light to-primary rounded-full opacity-20 animate-pulse' />
      </motion.div>

      {/* Content */}
      <h3 className='text-xl font-semibold text-primary mb-3'>{step.title}</h3>
      {(expanded || !isMobile) && (
        <p className='text-gray-text text-sm leading-relaxed'>
          {step.description}
        </p>
      )}

      {/* Decorative elements */}
      <div className='absolute top-2 right-2 w-2 h-2 bg-primary-light rounded-full opacity-30' />
      <div className='absolute bottom-2 left-2 w-1 h-1 bg-accent-warm rounded-full opacity-40' />
    </motion.div>
  );
}
