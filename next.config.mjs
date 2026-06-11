/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/projects',
          destination: '/mersi-scraped-site/www.mersi-architecture.com/projects/index.html',
        },
        {
          source: '/projects/:slug*',
          destination: '/mersi-scraped-site/www.mersi-architecture.com/projects/:slug*/index.html',
        }
      ]
    }
  },
  async redirects() {
    return [
      {
        source: '/projets/:slug*',
        destination: '/projects/:slug*',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
