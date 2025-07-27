import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for Firebase Hosting
  trailingSlash: true, // Required for static export
  images: {
    unoptimized: true, // Required for static export
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable server-side features for static export
  experimental: {
    // Disable features that require server
  },
};

export default nextConfig;
