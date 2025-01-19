/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
  basePath: '/FeedbackPartnerClient',
  assetPrefix: '/FeedbackPartnerClient',
}
 
module.exports = nextConfig