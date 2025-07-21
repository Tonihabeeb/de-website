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

  // Static export configuration for cPanel
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Development server configuration
  allowedDevOrigins: ['192.168.103.177', 'localhost', '127.0.0.1'],

  // Webpack configuration for better browser compatibility
  webpack: (config, { dev, isServer }) => {
    if (!isServer && dev) {
      // Add fallbacks for browser APIs
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Experimental features for better hydration handling
  experimental: {
    // Note: suppressHydrationWarning is not a valid experimental option
    // Hydration warnings are handled by our custom components instead
  },
};

module.exports = nextConfig;
