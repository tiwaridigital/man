// 'use client'
import React from 'react';
import fetchSingleManga from '../../../utils/data/fetchSingleManga';
import DetailsBanner from '@/components/details/detailsBanner/Index';
import BreadCrumb from '@/components/breadCrumb/BreadCrumb';

export async function generateMetadata({ params, searchParams }, parent) {
  // fetch data
  const manga = await fetchSingleManga(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${manga.title} - Manga Story`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', manga.coverImage],
    },
    description: manga.description.slice(0, 160),
  };
}

const Page = async ({ params }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const manga = await fetchSingleManga(params.slug);
  return (
    <div>
      {/*<DetailsBannerDex />*/}
      <DetailsBanner manga={manga} />
    </div>
  );
};

export default Page;
