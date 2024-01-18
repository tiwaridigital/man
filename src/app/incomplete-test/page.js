'use client';
import client from '../../../client';
import SINGLE_CHAPTER_MUTATE from '@/graphql/admin/chapters/SingleChapterMutation.gql';
import { sanityClient } from '../../../sanityClient';

const Page = () => {
  const getAllChapters = async () => {
    const query = '*[_type == "chapters"] | order(_createdAt asc)';
    const chapters = await sanityClient.fetch(query);
    console.log('all chapters', chapters);

    const nArr = chapters.slice(23).map((chapter, idx) => {
      const objArr = chapter.data.map((x) => {
        return {
          id: x.id,
          src_origin: x.src_origin,
        };
      });

      return {
        title: `Chapter ${3 - idx}`,
        url: '09ca1a8e-0154-4184-a78d-59aa8ecab135',
        data: objArr,
        slug: `insanely-talented-player-chapter-${3 - idx}`,
        hasNextEp:
          idx === 0
            ? false
            : true /* Inserted false for 0th idx => because chaptersArr is reversed in descending order */,
        totalEpisodes: 25,
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
          totalEpisodes: 25,
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
