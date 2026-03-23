import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Compress all responses — reduces transfer size by ~70%
  compress: true,

  // Cache static assets aggressively
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
    {
      // Cache fonts and static files for 1 year
      source: '/(.*)\\.(woff|woff2|ttf|otf|eot)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

  // Reduce JavaScript bundle size
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig