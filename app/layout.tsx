import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HydrationSuppressor from '@/components/HydrationSuppressor'
import BrowserExtensionHandler from '@/components/BrowserExtensionHandler'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'

export const metadata: Metadata = {
  title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
  description: 'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions.',
  keywords: 'renewable energy, kinetic power plant, KPP, clean energy, Iraq, sustainable power',
  authors: [{ name: 'Deep Engineering' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BrowserExtensionHandler />
        <PerformanceOptimizer>
          <HydrationSuppressor>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </HydrationSuppressor>
        </PerformanceOptimizer>
      </body>
    </html>
  )
} 