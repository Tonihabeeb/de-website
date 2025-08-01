'use client';

import { ReactNode } from 'react';

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
  return (
    <section className='relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary text-white text-center overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/90 via-primary-dark/90 to-primary/90' />
      <div 
        className='absolute inset-0 opacity-10' 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' 
        }} 
      />
      
      {/* Floating Elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl'></div>
      <div className='absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
      <div className='absolute bottom-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl'></div>
      
      <div className='container mx-auto relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl md:text-5xl font-bold font-serif mb-6 drop-shadow-lg text-white leading-tight'>
            {title}
          </h1>
          <p className='text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow text-white/90'>
            {subtitle}
          </p>
          {children && <div className='mt-8 text-white'>{children}</div>}
        </div>
      </div>
    </section>
  );
}
