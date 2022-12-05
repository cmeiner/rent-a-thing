/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'picsum.photos',
      'static.wikia.nocookie.net',
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextTranslate(nextConfig);
