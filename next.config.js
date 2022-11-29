/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'static.wikia.nocookie.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
};

module.exports = nextConfig;
