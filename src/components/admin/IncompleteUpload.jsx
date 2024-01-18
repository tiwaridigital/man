'use client';

import { sanityClient } from '../../../sanityClient';
import { slugify } from '@/utils/helpers';
import client from '../../../client';
import SINGLE_MANGA_MUTATE from '@/graphql/admin/SingleMangaMutation.gql';
import SINGLE_CHAPTER_MUTATE from '@/graphql/admin/chapters/SingleChapterMutation.gql';
import COMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/completeChapterMutation.gql';
import INCOMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/inCompleteChapterMutation.gql';
import { useEffect, useState } from 'react';
import { inCompleteUploadFetchDataFromServer } from '@/app/_actions/inCompleteUploadFetchDataFromServer';

const IncompleteUpload = () => {
  const selectedSrc = 'asuratoon';
  const srcUrl =
    'https://asuratoon.com/manga/9260952888-insanely-talented-player/';
  /*
   * First Fetch the URL from sanity
   * to know which chapter to start from
   */
  const fetchFromSanity = async () => {
    const id = 'hcPd9DU4IcfM8v35xRW8go';
    const query = `*[_type == "incompleteManga" && _id == "${id}"]`;
    const mangaResult = await sanityClient.fetch(query);
    console.log('manga result', result);
  };

  const handleDataFetching_Insertion = async (mangaResult) => {
    console.log('handleSources');
    /*
     * First Fetch The Manga Using fetchDataServerAction Function, which is a => Server Action
     * i.e. function based on 'use server' method -> where you can call other server functions
     * and then use those not directly supported server functions/methods -> indirectly
     */
    const data = await inCompleteUploadFetchDataFromServer(
      selectedSrc,
      // 'https://asuratoon.com/manga/6849480105-regressing-with-the-kings-power/'
      srcUrl,
      15,
    );

    // try {
    await createChapters(data.detail_manga, mangaResult, data.chapterImages);
    // } catch (err) {
    //   throw new Error(`Error Creating Single Manga to DB: ${err}`);
    // }
  };

  const createChapters = async (detail_manga, mangaResult, chapterImages) => {
    /*
     * Create Chapter Now => After Manga is Created
     */
    let chaptersArr = detail_manga.chapters
      .slice(mangaResult.completedChapters)
      .map((x, idx) => {
        return {
          title: x.title,
          url: mangaResult.id,
          chapter_data: chapterImages[idx],
          slug: slugify(
            `${mangaResult.slug} chapter ${
              detail_manga.chapters.length -
              detail_manga.completedChapters -
              idx
            }`,
          ),
          last_update: x.last_update,
        };
      });

    console.log('chaptersArr', chaptersArr);

    let count = 0;
    for (const x of chaptersArr) {
      const idx = chaptersArr.indexOf(x); // gets current idx
      console.log('idx', idx);
      const chapterObj = {
        _type: 'chapters',
        slug: `${x.title} chapter ${mangaResult.completedChapters + idx}`,
        data: x.map((xx, idx) => ({
          _key: idx.toString(),
          id: idx.toString(),
          src_origin: xx.src_origin,
          delete_url: xx.delete_url,
        })),
        title: `${x.title}-${idx + mangaResult.completedChapters}`,
        url: {
          _type: 'reference',
          _url: mangaResult._id,
        },
      };

      const chapterResult = await sanityClient.create(chapterObj);
      console.log('chapterResult', chapterResult);
      count++;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-[100px] font-normal">
      <InCompleteMangas
        handleDataFetching_Insertion={handleDataFetching_Insertion}
      />
      <input
        type="text"
        placeholder="Enter URL"
        className="w-[600px] p-2 px-4 rounded-full"
      />
      <button
        className="cardsNavBtn w-[200px] mt-8 text-white"
        style={{ backgroundImage: 'var(--gradient)' }}
        onClick={fetchFromSanity}
      >
        Complete Upload
      </button>
    </div>
  );
};

export default IncompleteUpload;

const InCompleteMangas = ({ handleDataFetching_Insertion }) => {
  const [mangas, setMangas] = useState([]);
  const fetchMangas = async () => {
    const query =
      '*[_type == "incompleteManga" && !(_id in path(\'drafts.**\'))]';
    const result = await sanityClient.fetch(query);
    setMangas(result);
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  console.log('mangas', mangas);

  return (
    <>
      <div className="mb-12 w-[1000px] font-normal">
        <h1 className="text-[22px] mb-12 rounded-full p-2 bg-teal-500 text-center text-white">
          Incomplete Manga List
        </h1>
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Title
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Completed Chapters
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Total Chapters
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Complete Upload
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {mangas?.map((manga, idx) => (
              <tr className="text-white" key={idx + 'hello'}>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {manga.title}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {manga.completedChapters}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {manga.chapters.length}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  <button
                    className="w-full text-white p-2 rounded-full bg-green-600"
                    style={{ backgroundImage: 'var(--gradient)' }}
                    onClick={() => handleDataFetching_Insertion(manga)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
