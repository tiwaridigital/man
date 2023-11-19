'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import client from '../../../client'
import SEARCH_MANGA_QUERY from '@/graphql/client/manga/SearchMangaQuery.gql'
import SearchResult from '@/components/searchResult/SearchResult'

const Page = () => {
  const params = useSearchParams().get('s')
  console.log('params', params)

  //   const fetchData = async () => {
  //     try {
  //       const result = await client.query({
  //         query: SEARCH_MANGA_QUERY,
  //         variables: {
  //           title: `%${params}%`,
  //         },
  //       })
  //       console.log('result', result)
  //     } catch (err) {
  //       console.log('error while fetching search query', err)
  //     }
  //   }

  //   fetchData()
  return (
    <>
      <div>Page</div> <SearchResult params={params} />
    </>
  )
}

export default Page
