/** @type {import('next-sitemap').IConfig} */

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  siteUrl: dev ? 'http://localhost:3000' : 'https://mangastory',
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/search',
    '/upload',
    '/incomplete-test',
    '/imgur',
    '/admin',
    '/admin/create',
    '/admin/incomplete-upload',
    '/paginate',
  ],
};
