/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'cdn.discordapp.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com']
  }
}

module.exports = nextConfig
