const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack(config) {
    return {
      ...config,
      experiments: {
        topLevelAwait: true,
      },
    }
  },
  experimental: {
    esmExternals: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
})
