import React from 'react';

export default function KPPHeroAnimation() {
  return (
    <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
      {/* Main Kinetic Circle */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='relative'>
          {/* Outer Ring - Main Rotation */}
          <div className='w-96 h-96 border-2 border-blue-400/30 rounded-full animate-spin-slow'>
            <div className='absolute inset-0 border border-blue-300/20 rounded-full animate-pulse'></div>
          </div>

          {/* Inner Ring - Counter Rotation */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indigo-400/40 rounded-full animate-spin-slow-reverse'>
            <div className='absolute inset-0 border border-indigo-300/30 rounded-full animate-pulse-delayed'></div>
          </div>

          {/* Core Element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full animate-pulse-slow text-white">
            <div className="absolute inset-2 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 rounded-full animate-ping-slow text-white"></div>
          </div>
        </div>
      </div>

      {/* Floating Energy Particles */}
      <div className='absolute inset-0'>
        {/* Particle 1 */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-float-1 text-white"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-float-1-delayed text-white"></div>

        {/* Particle 2 */}
        <div className='absolute top-3/4 right-1/4 w-2 h-2 bg-indigo-400/60 rounded-full animate-float-2'></div>
        <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-300/40 rounded-full animate-float-2-delayed'></div>

        {/* Particle 3 */}
        <div className='absolute top-1/2 right-1/3 w-2 h-2 bg-cyan-400/60 rounded-full animate-float-3'></div>
        <div className='absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-300/40 rounded-full animate-float-3-delayed'></div>

        {/* Particle 4 */}
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-float-4 text-white"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-float-4-delayed text-white"></div>
      </div>

      {/* Energy Flow Lines */}
      <svg
        className='absolute inset-0 w-full h-full'
        viewBox='0 0 1440 600'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient id='energyFlow' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#3B82F6' stopOpacity='0'>
              <animate
                attributeName='stop-opacity'
                values='0;0.6;0'
                dur='3s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='50%' stopColor='#6366F1' stopOpacity='0.6'>
              <animate
                attributeName='stop-opacity'
                values='0.6;0.8;0.6'
                dur='3s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='100%' stopColor='#06B6D4' stopOpacity='0'>
              <animate
                attributeName='stop-opacity'
                values='0;0.6;0'
                dur='3s'
                repeatCount='indefinite'
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Energy Flow Path 1 */}
        <path
          d='M 200 300 Q 400 200 600 300 T 1000 300'
          stroke='url(#energyFlow)'
          strokeWidth='2'
          fill='none'
          opacity='0.6'
        >
          <animate
            attributeName='stroke-dasharray'
            values='0,1000;500,500;1000,0'
            dur='4s'
            repeatCount='indefinite'
          />
        </path>

        {/* Energy Flow Path 2 */}
        <path
          d='M 400 100 Q 600 200 800 100 T 1200 100'
          stroke='url(#energyFlow)'
          strokeWidth='1.5'
          fill='none'
          opacity='0.4'
        >
          <animate
            attributeName='stroke-dasharray'
            values='0,800;400,400;800,0'
            dur='5s'
            repeatCount='indefinite'
          />
        </path>

        {/* Energy Flow Path 3 */}
        <path
          d='M 300 500 Q 500 400 700 500 T 1100 500'
          stroke='url(#energyFlow)'
          strokeWidth='1.5'
          fill='none'
          opacity='0.4'
        >
          <animate
            attributeName='stroke-dasharray'
            values='0,800;400,400;800,0'
            dur='6s'
            repeatCount='indefinite'
          />
        </path>
      </svg>

      {/* Air Injection Pulses */}
      <div className='absolute inset-0'>
        {/* Pulse 1 */}
        <div className='absolute top-1/3 left-1/4 w-4 h-4 border border-cyan-400/30 rounded-full animate-pulse-expand-1'></div>
        <div className='absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse-expand-1-delayed'></div>

        {/* Pulse 2 */}
        <div className='absolute bottom-1/3 right-1/4 w-4 h-4 border border-blue-400/30 rounded-full animate-pulse-expand-2'></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse-expand-2-delayed text-white"></div>

        {/* Pulse 3 */}
        <div className='absolute top-2/3 left-2/3 w-4 h-4 border border-indigo-400/30 rounded-full animate-pulse-expand-3'></div>
        <div className='absolute top-2/3 left-2/3 w-2 h-2 bg-indigo-400/20 rounded-full animate-pulse-expand-3-delayed'></div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-cyan-50/80 text-white"></div>
    </div>
  );
}
