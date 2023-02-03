/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'cdn.discordapp.com', 'avatars.githubusercontent.com']
  }
}

module.exports = nextConfig
