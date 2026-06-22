import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Netlify deployment
  output: "standalone",
  images: {
    // Allow Supabase storage images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
