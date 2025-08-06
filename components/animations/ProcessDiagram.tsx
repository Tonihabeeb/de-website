'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import {
  Zap,
  ArrowUp,
  RotateCcw,
  RefreshCw,
  Lightbulb,
  Settings,
  BarChart3,
  Cpu,
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessDiagramProps {
  steps: ProcessStep[];
}

export default function ProcessDiagram({ steps }: ProcessDiagramProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut' as const,
        delay: 0.5,
      },
    },
  };

  return (
    <div ref={ref} className='relative'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate={
          shouldReduceMotion ? undefined : isInView ? 'visible' : 'hidden'
        }
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Connection Lines */}
        <motion.div
          variants={lineVariants}
          className='hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary transform -translate-y-1/2 z-0'
          style={{ transformOrigin: 'left', willChange: 'transform, opacity' }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            className='relative z-10 text-center'
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Step Circle */}
            <motion.div
              className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 relative'
              whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ willChange: 'transform, opacity' }}
            >
              {step.step}
            </motion.div>

            {/* Icon */}
            <motion.div
              className='text-4xl mb-4'
              initial={{ rotate: 0 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : isInView
                    ? { rotate: 360 }
                    : { rotate: 0 }
              }
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              role='img'
              aria-label={step.title + ' icon'}
              style={{ willChange: 'transform, opacity' }}
            >
              {step.icon}
            </motion.div>

            {/* Content */}
            <motion.h3
              className='text-xl font-semibold text-primary mb-3'
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              {step.title}
            </motion.h3>

            <motion.p
              className="text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              {step.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
