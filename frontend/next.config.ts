import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix multi-root workspace warning when lockfiles exist in parent dirs
  turbopack: { root: __dirname },
  // Production-safe compiler options
  compiler: {
    // Remove console.log/debug in production, keep error/warn for server logs
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  // Optimize images (add your domains when using external images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
  // No experimental flags needed for Next.js 16
  // Ensure no custom server — default is fine for Vercel
};

export default nextConfig;
