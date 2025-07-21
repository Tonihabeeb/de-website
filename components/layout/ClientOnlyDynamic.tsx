'use client';
import dynamic from 'next/dynamic';

const BrowserExtensionHandler = dynamic(
  () => import('@/components/BrowserExtensionHandler'),
  { ssr: false }
);
const MobileOptimizer = dynamic(() => import('@/components/MobileOptimizer'), {
  ssr: false,
});
const PWARegistration = dynamic(() => import('@/components/PWARegistration'), {
  ssr: false,
});
const SEOOptimizer = dynamic(() => import('@/components/SEOOptimizer'), {
  ssr: false,
});
const PerformanceMonitor = dynamic(
  () => import('@/components/PerformanceMonitor'),
  { ssr: false }
);
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});
const BrowserCompatibility = dynamic(
  () => import('@/components/BrowserCompatibility'),
  { ssr: false }
);
const PerformanceOptimizer = dynamic(
  () => import('@/components/PerformanceOptimizer'),
  { ssr: false }
);
const HydrationSuppressor = dynamic(
  () => import('@/components/HydrationSuppressor'),
  { ssr: false }
);

export default function ClientOnlyDynamic({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <BrowserExtensionHandler />
      <MobileOptimizer />
      <PWARegistration />
      <SEOOptimizer />
      <PerformanceMonitor />
      <Analytics />
      <BrowserCompatibility />
      <PerformanceOptimizer>
        <HydrationSuppressor>{children}</HydrationSuppressor>
      </PerformanceOptimizer>
    </>
  );
}
