// 'use client'
import React from 'react';
import fetchSingleManga from '../../../utils/data/fetchSingleManga';
import DetailsBanner from '@/components/details/detailsBanner/Index';
import BreadCrumb from '@/components/breadCrumb/BreadCrumb';
import { metaKeywordsMaker, tagsMaker } from '@/utils/helpers';

export async function generateMetadata({ params, searchParams }, parent) {
  // fetch data
  const manga = await fetchSingleManga(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : 'https://mangastory.org',
    ),
    title: `${manga.title} - Manga Story`,
    openGraph: {
      images: [manga.coverImage],
    },
    description: `${manga.title} - ${manga.description.slice(0, 160)}`,
    keywords:  metaKeywordsMaker(manga.title)
  };
}

const Page = async ({ params }) => {
  const manga = await fetchSingleManga(params.slug);
  return (
    <div>
      <DetailsBanner manga={manga} />
    </div>
  );
};

export default Page;
