import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Optional for performance
  images: {
    domains: ["i.ytimg.com", "img.youtube.com"], // Add any domains you fetch images from
  },
  // You can add more config here if needed
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA during dev mode
  ...nextConfig,
});


