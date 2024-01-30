// 'use client'
import React from 'react';
import fetchSingleManga from '../../../utils/data/fetchSingleManga';
import DetailsBanner from '@/components/details/detailsBanner/Index';
import BreadCrumb from '@/components/breadCrumb/BreadCrumb';

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetchSingleManga(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Manga - ${product.title}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', '...previousImages'],
    },
    description: product.description.slice(0, 100),
  };
}

const Page = async ({ params, searchParams }) => {
  const manga = await fetchSingleManga(params.slug);
  return (
    <div>
      {/*<DetailsBannerDex />*/}
      <DetailsBanner manga={manga} />
    </div>
  );
};

export default Page;
