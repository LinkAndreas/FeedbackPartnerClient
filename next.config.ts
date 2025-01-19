/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/FeedbackPartnerClient',
  assetPrefix: '/FeedbackPartnerClient',
}
 
module.exports = nextConfig