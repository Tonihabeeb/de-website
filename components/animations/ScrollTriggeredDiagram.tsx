'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollTriggeredDiagramProps {
  steps: Array<{
    step: string;
    title: string;
    description: string;
    icon: string | React.ReactNode;
  }>;
}

export default function ScrollTriggeredDiagram({ steps }: ScrollTriggeredDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative py-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #18335A 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transform -translate-y-1/2 z-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-light rounded-full opacity-20"
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
    >
      {/* Step Circle */}
      <motion.div 
        className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 relative shadow-lg"
        initial={{ scale: 0, rotate: 0 }}
        animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.1,
          ease: "backOut"
        }}
      >
        <span className="relative z-10">{step.step}</span>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary rounded-full opacity-20 animate-pulse" />
      </motion.div>
      
      {/* Icon */}
      <motion.div 
        className="text-2xl mb-4"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.2 + 0.2,
          ease: "backOut"
        }}
      >
        {step.icon}
      </motion.div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-primary mb-3">
        {step.title}
      </h3>
      
      <p className="text-gray-text text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-primary-light rounded-full opacity-30" />
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent-warm rounded-full opacity-40" />
    </motion.div>
  );
} 