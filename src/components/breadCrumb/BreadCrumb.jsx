import React from 'react';
import Home from '../../../public/assets/icons/Home';
import Book from '../../../public/assets/icons/Book';

const BreadCrumb = ({ title, type, chapterTitle, chapterParentPath }) => {
  return (
    <div className="pl-[20px] p-2.5 mb-[20px] bg-[#0D2851] relative rounded-md text-gray-50">
      <ol
        itemScope=""
        itemType="http://schema.org/BreadcrumbList"
        className="flex items-center gap-2 cursor-pointer text-[14px] flex-wrap "
      >
        <li
          itemProp="itemListElement"
          itemScope=""
          itemType="http://schema.org/ListItem"
        >
          <a itemProp="item" href="/" className="flex items-center gap-2">
            <Home color={'white'} height={20} width={20} />
            <span itemProp="name">Asura Scans ›</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope=""
          itemType="http://schema.org/ListItem"
        >
          <a
            itemProp="item"
            href={chapterParentPath}
            className="flex items-center gap-2"
          >
            <Book color="white" height={20} width={20} />
            <span itemProp="name">{`${title} ${
              type === 'chapter' ? '›' : ''
            }`}</span>
          </a>
          <meta itemProp="position" content="2" />
        </li>
        {type === 'chapter' && (
          <>
            <li
              itemProp="itemListElement"
              itemScope=""
              itemType="http://schema.org/ListItem"
            >
              <a itemProp="item" href={'/'} className="flex items-center gap-2">
                <Book color="white" height={20} width={20} />
                <span
                  itemProp="name"
                  className="leading-4"
                >{`${title} ${chapterTitle}`}</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </>
        )}
      </ol>
    </div>
  );
};

export default BreadCrumb;
