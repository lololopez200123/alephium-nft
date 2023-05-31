/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    //ENVIRONMENT: "development-walletconnect"
    //ENVIRONMENT: "development-nodewallet"
    ENVIRONMENT: "browser-extension"
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/my-nfts',
        permanent: true
      }
    ]
  },
  images: {
    domains: ['alephium-nft.infura-ipfs.io']
  }
}

module.exports = nextConfig
