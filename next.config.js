/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now default in Next.js 15
  reactStrictMode: true,
  
  // Suppress hydration warnings in development
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Experimental features for better hydration handling
  experimental: {
    // Note: suppressHydrationWarning is not a valid experimental option
    // Hydration warnings are handled by our custom components instead
  },
}

module.exports = nextConfig 