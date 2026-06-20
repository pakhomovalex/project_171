import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['zustand'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'charity-platform-backend-va70.onrender.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-ea16cd9d48134f17bab13b9ace64ae69.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;