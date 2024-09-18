/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '/football/teams/**'
      },
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
        port: '',
        pathname: '/images/media/**'
      }
    ]
  }
}

export default nextConfig
