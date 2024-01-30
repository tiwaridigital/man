'use client';
import client from '../../../client';
import SINGLE_CHAPTER_MUTATE from '@/graphql/admin/chapters/SingleChapterMutation.gql';
import { sanityClient } from '../../../sanityClient';

const Page = () => {
  const totalEpisodes = 12;
  const getAllChapters = async () => {
    const query =
      '*[_type == "chapters" && url._ref == "hcPd9DU4IcfM8v35xUiiAM" && !(_id in path(\'drafts.**\'))] | order(_createdAt asc)';
    const chapters = await sanityClient.fetch(query);
    console.log('all chapters', chapters);

    const nArr = chapters.map((chapter, idx) => {
      const objArr = chapter.data.map((x) => {
        return {
          id: x.id,
          src_origin: x.src_origin,
        };
      });

      return {
        title: `Chapter ${12 - idx}`,
        url: 'ac3deaac-3587-4153-ba73-c73c36972328',
        data: objArr,
        slug: `bloodhounds-regression-instinct-chapter-${12 - idx}`,
        hasNextEp:
          idx === 0
            ? false
            : true /* Inserted false for 0th idx => because chaptersArr is reversed in descending order */,
        totalEpisodes,
      };
    });

    console.log('nArr', nArr);
    const chapterCreate = await insertChapters(nArr);
  };
  const insertChapters = async (chaptersArr) => {
    let count = 0;
    for (const x of chaptersArr) {
      const idx = chaptersArr.indexOf(x); // gets current idx
      console.log('idx', idx);
      const chapterResult = await client.mutate({
        mutation: SINGLE_CHAPTER_MUTATE,
        variables: {
          title: x.title,
          url: x.url,
          data: x.data,
          slug: x.slug,
          hasNextEp:
            idx === 0
              ? false
              : true /* Inserted false for 0th idx => because chaptersArr is reversed in descending order */,
          totalEpisodes,
        },
      });
      console.log('chapterResult', chapterResult);
      count++;
    }
  };

  return (
    <div className="py-[150px] flex justify-center flex-col items-center">
      <h1 className="text-[30px] text-white text-center">INCOMPLETE TEST</h1>
      <button
        className="p-2 px-12 bg-white rounded-lg mt-12"
        onClick={getAllChapters}
      >
        Get All Chapters
      </button>
    </div>
  );
};

export default Page;
