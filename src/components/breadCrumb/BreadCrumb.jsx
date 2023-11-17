import React from 'react'
import Home from '../../../public/assets/icons/Home'
import Book from '../../../public/assets/icons/Book'

const BreadCrumb = () => {
  return (
    <div className='pl-[20px] p-1.5 mb-[10px] bg-[#0D2851] relative rounded-sm text-gray-50'>
      <ol
        itemscope=''
        itemtype='http://schema.org/BreadcrumbList'
        className='flex items-center gap-2 cursor-pointer'
      >
        <li
          itemprop='itemListElement'
          itemscope=''
          itemtype='http://schema.org/ListItem'
        >
          <a
            itemprop='item'
            href='https://asuratoon.com/'
            className='flex items-center gap-2'
          >
            <Home color={'white'} height={20} width={20} />
            <span itemprop='name'>Asura Scans</span>
          </a>
          <meta itemprop='position' content='1' />
        </li>
        ›
        <li
          itemprop='itemListElement'
          itemscope=''
          itemtype='http://schema.org/ListItem'
        >
          <a itemprop='item' href={'/'} className='flex items-center gap-2'>
            <Book color='white' height={20} width={20} />
            <span itemprop='name'>
              The Reincarnated Assassin is a Genius Swordsman
            </span>
          </a>
          <meta itemprop='position' content='2' />
        </li>
      </ol>
    </div>
  )
}

export default BreadCrumb
