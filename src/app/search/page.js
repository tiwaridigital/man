import React from 'react'
import client from '../../../client'
import SEARCH_MANGA_QUERY from '@/graphql/client/manga/SearchMangaQuery.gql'
import SearchResult from '@/components/searchResult/SearchResult'
import { Suspense } from 'react'

// This component passed as fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function SearchBarFallback() {
  return <>placeholder</>
}


const Page = () => {
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
     <SearchResult />
      </Suspense>
    </>
  )
}

export default Page
