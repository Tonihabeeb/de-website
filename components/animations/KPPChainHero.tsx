'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * KPPChainHero
 * Hero section animation: looping chain with floaters
 * Concept 1: Two sprockets connected by an endless chain path,
 * with floaters riding the path and subtle water ripple background.
 */
const KPPChainHero: React.FC = () => {
  const chainControls = useAnimation();
  const rippleControls = useAnimation();

  useEffect(() => {
    // Start continuous sprocket rotation
    chainControls.start({
      rotate: 360,
      transition: { repeat: Infinity, ease: 'linear', duration: 12 },
    });

    // Start subtle background ripple movement
    rippleControls.start({
      backgroundPosition: ['0px 0px', '0px 200px'],
      transition: { repeat: Infinity, ease: 'linear', duration: 8 },
    });
  }, [chainControls, rippleControls]);

  const floaterCount = 8;
  const floaterDelay = 12 / floaterCount;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-white text-white">
      {/* Water ripple background layer */}
      <motion.div
        className="absolute inset-0 bg-[url('/assets/waves.svg')] bg-repeat opacity-50"
        animate={rippleControls}
      />

      {/* SVG container for chain and floaters */}
      <motion.svg
        viewBox='0 0 600 260'
        className='relative mx-auto top-1/4 w-4/5 max-w-3xl'
        animate={chainControls}
      >
        {/* Top sprocket */}
        <circle
          cx='300'
          cy='60'
          r='48'
          stroke='#333'
          strokeWidth='10'
          fill='none'
        />

        {/* Bottom sprocket */}
        <circle
          cx='300'
          cy='200'
          r='48'
          stroke='#333'
          strokeWidth='10'
          fill='none'
        />

        {/* Chain path linking sprockets */}
        <path
          id='chainPath'
          d='
            M 300 12
            A 48 48 0 0 1 348 60
            L 348 200
            A 48 48 0 0 1 300 248
            L 252 248
            A 48 48 0 0 1 204 200
            L 204 60
            A 48 48 0 0 1 252 12
            Z
          '
          stroke='#666'
          strokeWidth='12'
          fill='none'
        />

        {/* Floaters riding the chain */}
        {Array.from({ length: floaterCount }).map((_, index) => (
          <motion.circle
            key={index}
            r='10'
            fill='#FBBF24'
            style={{
              offsetPath:
                "path('M300,12 A48,48 0 0,1 348,60 L348,200 A48,48 0 0,1 300,248 L252,248 A48,48 0 0,1 204,200 L204,60 A48,48 0 0,1 252,12 Z')",
              offsetRotate: 0 as any,
            }}
            animate={{
              offsetDistance: ['0%', '100%'],
              translateY: [0, -4, 0],
            }}
            transition={{
              duration: 12,
              ease: 'linear',
              repeat: Infinity,
              delay: index * floaterDelay,
            }}
          />
        ))}
      </motion.svg>

      {/* Overlayed headline and CTA */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Harnessing Kinetic Power
        </h1>
        <p className="text-lg md:text-2xl text-white">
          Discover how our KPP system transforms motion into clean, reliable
          energy.
        </p>
        <a
          href='#learn-more'
          className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none transition text-white"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default KPPChainHero;
