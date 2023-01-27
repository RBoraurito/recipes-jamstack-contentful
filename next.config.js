/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/recipe',
        destination: '/recipes',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
