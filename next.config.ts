import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ytimg.com", "img.youtube.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // শুধু ডেপ্লয়মেন্টের জন্য
  },
  typescript: {
    ignoreBuildErrors: true, // শুধু জরুরি ক্ষেত্রে
  },
  // experimental: {
  //   appDir: true,
  // },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [],
  ...baseConfig, // main config এর সাথে মিক্স করে
});
