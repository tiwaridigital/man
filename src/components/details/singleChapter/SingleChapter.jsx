'use client';
import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import './style.scss';
import BreadCrumb from '@/components/breadCrumb/BreadCrumb';
import Image from 'next/image';
import RightPaginationArrow from '../../../../public/assets/icons/RightPaginationArrow';
import LeftPaginationArrow from '../../../../public/assets/icons/LeftPaginationArrow';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Exclamation from '../../../../public/assets/icons/Exclamation';

const SingleChapter = ({ chapter }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const params = useParams();
  const [imgHeight, setImgHeight] = useState([]);
  const [imgWidth, setImgWidth] = useState([]);
  const mangaTitle = chapter?.singleMang?.title;
  const paramsArr = params.slug.split('-');
  const parentPath = paramsArr.slice(0, paramsArr.length - 2).join('-');

  console.log('parentPath', parentPath);
  console.log('chapterData', chapter);

  const currentPathArr = currentPath.split('-'); // split on basis of '-' so that, it can be replaced with selected chapter.
  // Prev & Next Page URL
  const prevPage = currentPath.replace(
    currentPathArr[currentPathArr.length - 1],
    String(currentPathArr[currentPathArr.length - 1] - 1), // didn't had to convert to number because '-' sign is alreadt converting it to number.
  );
  const nextPage = currentPath.replace(
    currentPathArr[currentPathArr.length - 1],
    String(Number(currentPathArr[currentPathArr.length - 1]) + 1),
  );

  console.log('nextPage', nextPage);

  const chaptersArr = [...Array(chapter.totalEpisodes)]; // Create an empty Array equals to total Episodes
  // Insert React Select Objects into this Array
  chaptersArr.forEach((x, idx) => {
    const obj = {
      value: idx + 1,
      label: `Chapter ${idx + 1}`,
    };
    chaptersArr[idx] = obj;
  });

  console.log('chaptersArr', chaptersArr);
  const handleimgAspectRatio = (e, idx) => {
    console.log('idx', idx, e.currentTarget.naturalHeight);
    setImgHeight((prevImgHeights) => [
      ...prevImgHeights,
      { idx: idx, height: e.currentTarget.naturalHeight },
    ]);
    setImgWidth((prevImgWidths) => [
      ...prevImgWidths,
      { idx: idx, width: e.currentTarget.naturalWidth },
    ]);
  };

  useEffect(() => {
    // Your logic to set image height and width after loading
    // console.log('imgHeight', imgHeight)
    // console.log('imgWidth', imgWidth)
  }, [imgHeight, imgWidth]);

  const handleSelectedChapter = (e) => {
    const selectedOption = e.target.options.selectedIndex; // gets selected chapter
    const currentPathArr = currentPath.split('-'); // split on basis of '-' so that, it can be replaced with selected chapter
    const newPath = currentPath.replace(
      currentPathArr[currentPathArr.length - 1],
      selectedOption,
    );
    router.push(newPath);
  };

  return (
    <div className="pt-[100px]">
      <ContentWrapper>
        <BreadCrumb
          title={chapter?.singleMang?.title}
          chapterTitle={chapter?.title}
          type={'chapter'}
          chapterParentPath={`/manga/${parentPath}`}
        />
        <div className="mt-8 chapter-wrapper">
          <h1 className="text-center text-[20px] leading-7 font-semibold text-gray-100">
            {mangaTitle} - {chapter?.title}
          </h1>
          <h3 className="text-center text-[15px] font-bold mt-4 leading-5">
            <Link href={`/manga/${parentPath}`}>
              Read All Chapters of -{' '}
              <span className="text-gray-500"> {mangaTitle}</span>
            </Link>
          </h3>
          <div className="subtitle" style={{ marginTop: 20 }}>
            Read the latest manga{' '}
            <strong>
              {mangaTitle} - {chapter?.title}
            </strong>{' '}
            at Asura Scans . Manga <strong>{mangaTitle}</strong> always updated
            at Asura Scans . Dont forget to read the other manga updates. A list
            of manga collections Asura Scans is in the Manga List menu.
          </div>
          {/*Navigation*/}
          <div className="flex flex-col gap-4 sm:flex-row justify-between mb-8 relative">
            {/* prettier-ignore */}
            {/* eslint-disable */}
            <div>
              <select
                className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                onChange={handleSelectedChapter}
              >
                <option selected>Select Chapters</option>
                {[...Array(chapter.totalEpisodes)].map((x, idx) => {
                  return <option>Chapter {idx + 1}</option>;
                })}
              </select>
            </div>
            <div className="chapter-nav flex gap-2 items-center justify-end sm:w-1/2">
              {/* Prev Page */}
              {currentPathArr[currentPathArr.length - 1] != 1 ? (
                <Link href={prevPage} className="w-1/2 sm:w-fit">
                  <span className="chapter-navBtn nlast w-full">
                    <LeftPaginationArrow height={18} width={18} />
                    Prev Chapter
                  </span>
                </Link>
              ) : (
                <span className="w-1/2 sm:w-fit chapter-navBtn">
                  <Exclamation height={18} width={18} />
                  Prev Chapter
                </span>
              )}
              {/* Prev Page End */}
              {/* Next Page */}
              {chapter.totalEpisodes !=
              currentPathArr[currentPathArr.length - 1] ? (
                <Link href={nextPage} className="w-1/2 sm:w-fit">
                  <span className="chapter-navBtn nlast w-full">
                    Next Chapter
                    <RightPaginationArrow height={18} width={18} />
                  </span>
                </Link>
              ) : (
                <span className="w-1/2 sm:w-fit chapter-navBtn">
                  Next Chapter
                  <Exclamation height={18} width={18} />
                </span>
              )}
              {/* Next Page End */}
            </div>
          </div>
          {/*Navigation*/}
          <div className="relative flex flex-col items-center">
            {/* Images */}
            {chapter?.data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={`backdrop-img ${
                    idx > 0 ? 'md:w-[800px]' : 'md:w-full'
                  } mb-6`}
                  // style={{
                  //   width: imgWidth[idx]?.width || 800,
                  //   height: imgHeight[idx]?.height || 500,
                  // }}
                >
                  {/* <Img src={item.src_origin} alt='' /> */}
                  <Image
                    src={item.src_origin}
                    alt=""
                    // fill
                    // width={imgWidth[idx]?.width || 800}
                    // height={imgHeight[idx]?.height || 500}
                    width={800}
                    height={500}
                    placeholder="empty"
                    blurDataURL="data:image/jpeg..."
                    // width='0'
                    // height='0'
                    // sizes='80vw'
                    style={{ width: '100%', height: 'auto' }}
                    priority={idx === 0 ? true : false}
                    onLoad={(e) => handleimgAspectRatio(e, idx)}
                    unoptimized
                    // style={{
                    //   maxWidth: '100%',
                    //   width: '100%',
                    //   height: 'auto',
                    // }}
                  />
                </div>
              );
            })}
            {/* Images */}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SingleChapter;
