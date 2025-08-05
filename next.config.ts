/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.sekai.best'],
    // Or use remotePatterns for more control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.sekai.best',
        pathname: '/sekai-jp-assets/**',
      },
    ],
  },
}

module.exports = nextConfig