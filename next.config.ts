import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for highlighting potential problems
  output: 'standalone', // Enable standalone output for Docker
  trailingSlash: true, // Required for static export
  images: {
    unoptimized: true, // Required for static export
    // Add any necessary image optimization configurations here
    // For example, if using a specific image CDN:
    // domains: ['example.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },
  // Optionally, add experimental features or other configurations as needed
  // experimental: {
  //   serverActions: true,
  //   useCompiled: true,
  // },
};

export default nextConfig;
