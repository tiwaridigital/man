// app/post-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap';
import fetchSlugs from '@/lib/fetchSlugs';
const dev = process.env.NODE_ENV !== 'production';
const url = dev ? 'http://localhost:3000' : 'https://man-iota.vercel.app';
console.log('url', url);
export async function GET(request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const slugs = await fetchSlugs();
  console.log('slugs', slugs);
  // return getServerSideSitemap([
  //   {
  //     loc: 'https://example.com',
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  //   {
  //     loc: 'http://man-iota.vercel.app/manga/[slug]',
  //     // loc: 'https://example.com/dynamic-path-2',
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  // ]);

  return getServerSideSitemap(
    slugs.map((x) => {
      return {
        loc: `${url}/manga/${x.slug}`,
        lastmod: x.createdAt,
      };
    }),
  );
}
