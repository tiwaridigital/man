import React from 'react';

import SingleChapter from '@/components/details/singleChapter/SingleChapter';
import fetchSingleChapter from '@/utils/data/fetchSingleChapter';
import fetchSingleManga from '@/utils/data/fetchSingleManga';
import { tagsMaker } from '@/utils/helpers';
export async function generateMetadata({ params }, parent) {
  // fetch data
  const chapterData = await fetchSingleChapter(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${chapterData.singleMang.title} ${chapterData.title} - Manga Story`,
    openGraph: {
      images: [chapterData.coverImage, '/some-specific-page-image.jpg'],
    },
    description: `Read the latest manga ${chapterData.singleMang.title} - ${chapterData.title} at Manga Story . Manga ${chapterData.singleMang.title} always updated at Manga Story.`,
  };
}

const Page = async ({ params }) => {
  const chapterData = await fetchSingleChapter(params.slug);
  return (
    <div>
      <SingleChapter chapter={chapterData} />
    </div>
  );
};

export default Page;
