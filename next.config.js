/** @type {import('next').NextConfig} */
import nextTranslate from 'next-translate';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'static.wikia.nocookie.net'],
  },
};

export default nextTranslate(nextConfig);
