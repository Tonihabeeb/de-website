'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const steps = stepRefs.current.filter(Boolean);

    // Create timeline for the entire animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false, // Set to true for debugging
      },
    });

    // Animate each step sequentially
    steps.forEach((step, index) => {
      if (!step) return;

      // Initial state
      gsap.set(step, {
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      // Animate in
      tl.to(step, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, index * 0.3);

      // Add a subtle hover effect
      tl.to(step, {
        y: -5,
        duration: 0.2,
        ease: 'power2.out',
      }, index * 0.3 + 0.5);

      // Return to normal position
      tl.to(step, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, index * 0.3 + 0.7);
    });

    // Animate connection lines
    const lines = container.querySelectorAll('.connection-line');
    lines.forEach((line, index) => {
      tl.fromTo(line, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 0.3, 
          ease: 'power2.out',
          transformOrigin: 'left'
        }, 
        index * 0.3 + 0.2
      );
    });

    // Animate icons with rotation
    const icons = container.querySelectorAll('.step-icon');
    icons.forEach((icon, index) => {
      tl.fromTo(icon,
        { rotation: 0, scale: 0 },
        {
          rotation: 360,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        index * 0.3 + 0.1
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [steps]);

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
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transform -translate-y-1/2 z-0 connection-line" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { stepRefs.current[index] = el; }}
              className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
            >
              {/* Step Circle */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 relative shadow-lg">
                <span className="relative z-10">{step.step}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary rounded-full opacity-20 animate-pulse" />
              </div>
              
              {/* Icon */}
              <div className="text-2xl mb-4 step-icon">
                {step.icon}
              </div>
              
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
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-light rounded-full opacity-20 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
} 