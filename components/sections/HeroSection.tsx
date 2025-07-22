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
    <section className='relative py-16 md:py-24 bg-primary text-white text-center'>
      <div className='container mx-auto'>
        <h1 className='text-3xl md:text-5xl font-bold font-serif mb-4 drop-shadow-md text-white'>
          {title}
        </h1>
        <p className='text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow text-white'>
          {subtitle}
        </p>
        {children && <div className='mt-6 text-white'>{children}</div>}
      </div>
    </section>
  );
}
