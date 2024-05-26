'use client';
import React, { useState } from 'react';
import handleInterruptedUpload from '@/utils/admin/data/handleInterruptedUpload';
import { fetchDataServerAction } from '@/app/_actions/fetchDataFromServer';

const Page = () => {
  const hello = async () => {
    const data = await fetchDataServerAction(
      'asuratoon',
      'https://asuratoon.com/manga/9260952888-insanely-talented-player/',
    );

    await handleInterruptedUpload([], data.detail_manga);
  };

  return (
    <>
      <div style={{ paddingTop: '150px', marginBottom: '150px' }}>
        <h1 className="text-[40px] text-white text-center">Paginate</h1>
        <button onClick={hello} className="bg-white h-[40px] w-[200px]">
          Click
        </button>
      </div>
    </>
  );
};

export default Page;
