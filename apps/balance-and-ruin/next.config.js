/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  
  transpilePackages: ["@ff6wc/ff6-types", "@ff6wc/ui", "@ff6wc/utils", "@ff6wc/tailwind-config"],
};
