/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['scan.rswl.ai'],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://scan.rswl.ai/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
