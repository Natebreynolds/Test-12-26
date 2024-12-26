/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'gofocusselling.com'
      }
    ]
  },
  // Core configuration
  reactStrictMode: true,
  poweredByHeader: false
};

module.exports = nextConfig;