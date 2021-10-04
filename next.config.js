module.exports = {
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
}
