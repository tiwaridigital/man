/** @type {import('next-sitemap').IConfig} */

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  siteUrl: dev ? 'http://localhost:3000' : 'https://man-iota.vercel.app',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
