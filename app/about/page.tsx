import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';


export const metadata: Metadata = {
  title: 'About Deep Engineering - Iraq\'s Renewable Energy Pioneer',
  description: 'Learn about Deep Engineering, Iraq\'s pioneer in renewable energy project development. Founded in 2019, we\'re transforming the energy landscape with innovative KPP technology.',
  keywords: 'Deep Engineering, Iraq renewable energy, KPP technology, clean energy projects, sustainable power',
};

export default function AboutPage() {
  return (
    <div>
      <HeroSection
        title="About Deep Engineering"
        subtitle="Iraq's pioneer in renewable energy project development, turning innovative technology into sustainable power."
      />


    </div>
  );
} 