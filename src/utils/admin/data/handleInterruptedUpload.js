import { sanityClient } from '../../../../sanityClient';
import { slugify } from '@/utils/helpers';
import SINGLE_MANGA_MUTATE from '@/graphql/admin/SingleMangaMutation.gql';
import client from '../../../../client';
import { uuid } from '@sanity/uuid';
import SINGLE_CHAPTER_MUTATE from '@/graphql/admin/chapters/SingleChapterMutation.gql';
import COMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/completeChapterMutation.gql';
import INCOMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/inCompleteChapterMutation.gql';

/*
 * Execution Flow
 * 1: Create Manga with all details & an Unique Id
 * 2: Create Interrupted Chapters => By using Manga's Id for ref
 */

export default async function handleInterruptedUpload(
  chapterImages,
  detail_manga,
  stoppedChapterIdx,
  caller,
) {
  console.log('handleInterruptedUpload called');
  console.log('stoppedChapterIdx', stoppedChapterIdx);
  if (caller != 'incomplete-upload') {
    await createManga(detail_manga, chapterImages, stoppedChapterIdx);
  } else {
    console.log('handleInterruptedUpload else block - only create chapters');
    console.log('chapterImages', chapterImages);
    for (const outerArr of chapterImages) {
      const idx = chapterImages.indexOf(outerArr);
      console.log('outerArr', idx);
      const chapterObj = {
        _type: 'chapters',
        slug: slugify(
          `${detail_manga.title} chapter ${stoppedChapterIdx + idx}`,
        ),
        data: outerArr.map((x, idx) => ({
          _key: idx.toString(),
          id: idx.toString(),
          src_origin: x.src_origin,
          delete_url: x.delete_url,
        })),
        title: `${detail_manga.title}-${idx + stoppedChapterIdx}`,
        url: {
          _type: 'reference',
          _url: '',
        },
      };

      const result = await sanityClient.create(chapterObj);
      console.log('result', result);
    }
  }
}

const createManga = async (detail_manga, chapterImages, stoppedChapterIdx) => {
  console.log('detail_manga', detail_manga);
  const {
    title,
    alterNativeName,
    artist,
    author,
    coverImage,
    status,
    description,
    rate: rating,
    uploadedDate,
    updatedDate,
  } = detail_manga;
  const slug = slugify(title);
  const genres = detail_manga.genres.map((x) => x.name);
  const dates = {
    uploadedDate: uploadedDate,
    updatedDate,
  };
  /*
   * Create Chapter in Single Manga => To get chapter details for later use => for fetching the chapters
   */
  let chapters = detail_manga.chapters.map((x, idx) => {
    return {
      _key: idx.toString(),
      title: x.title,
      slug: slugify(`${slug} chapter ${detail_manga.chapters.length - idx}`),
      last_update: x.last_update,
    };
  });

  console.log('chapters', chapters);

  const sanityObj = {
    _type: 'incompleteManga',
    id: uuid(),
    title,
    alternativeName: alterNativeName,
    artist,
    author,
    coverImage,
    genres,
    status,
    description: description,
    src: 'asuratoon',
    slug,
    chapters,
    completedChapters: stoppedChapterIdx,
    rating,
    dates,
    totalChapters: detail_manga.chapters.length,
  };

  const mangaResult = await sanityClient.create(sanityObj);
  console.log('mangaResult', mangaResult);
  const chaptersCreated = await createChapters(
    detail_manga,
    mangaResult,
    chapterImages,
    stoppedChapterIdx,
  );
  console.log('chaptersCreated', chaptersCreated);
};

const createChapters = async (
  detail_manga,
  mangaResult,
  chapterImages,
  stoppedChapterIdx,
) => {
  /*
   * Create Chapter Now => After Manga is Created
   */
  let chaptersArr = detail_manga.chapters
    .slice(0, stoppedChapterIdx)
    .map((x, idx) => {
      return {
        title: `${detail_manga.title} ${x.title}`,
        url: mangaResult.id,
        chapter_data: chapterImages[idx],
        slug: slugify(
          `${mangaResult.slug} chapter ${mangaResult.totalChapters - idx}`,
        ),
        last_update: x.last_update,
      };
    });

  console.log('chapters', chaptersArr);

  let count = 0;
  for (const x of chaptersArr) {
    const idx = chaptersArr.indexOf(x); // gets current idx
    console.log('idx', idx);

    const chapterObj = {
      _type: 'chapters',
      slug: slugify(x.title),
      data: x.chapter_data.map((xx, idx) => ({
        _key: idx.toString(),
        id: idx.toString(),
        src_origin: xx.src_origin,
        delete_url: xx.delete_url,
      })),
      title: `${x.title}`,
      url: {
        _type: 'reference',
        _ref: mangaResult._id,
      },
    };

    const chapterResult = await sanityClient.create(chapterObj);
    console.log('chapterResult', chapterResult);
    count++;
  }
};
