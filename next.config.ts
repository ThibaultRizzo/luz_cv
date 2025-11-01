import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Prevent aggressive caching in development
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, must-revalidate',
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
