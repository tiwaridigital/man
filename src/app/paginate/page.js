'use client';
import React from 'react';
import deleteImgBB from '@/utils/admin/data/deleteImgBB';

const Page = () => {
  const hello = () => {
    // deleteImgBB();
  };

  hello();
  return (
    <>
      <div style={{ paddingTop: '150px', marginBottom: '150px' }}>
        <h1 className="text-[40px] text-white text-center">Paginate</h1>
        <button onClick={deleteImgBB} className="bg-white h-[40px] w-[200px]">
          Click
        </button>
      </div>
    </>
  );
};

export default Page;
