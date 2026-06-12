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
// force restart 1
// force restart 2
// force restart 3
// force restart nuclear
// force restart nuclear 2
// force restart nuclear 3
// force restart nuclear 4
// force restart nuclear 5
// force restart nuclear 6
// force restart nuclear 7
// force restart nuclear 8
