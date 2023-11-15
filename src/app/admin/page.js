'use client'
import { useMutation } from '@apollo/client'
import MANAGA_MUTATE from '../../graphql/admin/SingleMangaMutation.gql'
import MANGA_QUERY from '../../graphql/admin/SingleMangaQuery.gql'
import React from 'react'
import client from '../../../client'

const Page = () => {
  let he = {
    path: '/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
    url: 'https://mangadex.org/chapter/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
    parent_href: '/chapter/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
    title: 'Night Creeping',
    uploadedDate: '2023-11-07T06:24:22+00:00',
    alterNativeName: 'I Want to See You Embarrassed',
    artist: 'Umagome Rakure',
    author: 'Sxy Rakure',
    uploadedDate: '2021-02-12T18:22:43+00:00',
    description:
      'Akito Shirasawa, a high school boy whose father is a film director, sees something in the library preparation room. It was the "masturbation scene" of his classmate, Kaho Honjou. Akito is puzzled, but ends up filming it with his smartphone. Kaho notices Akito, and in the men\'s restroom, makes a "proposal" to Akito! Exposed high school girl and movie boy. The "exposed love" of twisted adolescence, begins!',
    coverImage:
      'https://uploads.mangadex.org/covers/05bd710c-d94a-45eb-be99-2109d58f1006/13798b9c-a057-4b2e-8793-23568dbbc9e6.jpg',
    status: 'ongoing',
    chapters: [
      {
        path: '/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
        url: 'https://mangadex.org/chapter/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
        parent_href: '/chapter/f43789a1-755f-4ee6-9f92-58e3d6bc4d45',
        title: 'Night Creeping',
        uploadedDate: '2023-11-07T06:24:22+00:00',
      },
      {
        path: '/faa5a899-c76e-4539-92ea-70475db51fed',
        url: 'https://mangadex.org/chapter/faa5a899-c76e-4539-92ea-70475db51fed',
        parent_href: '/chapter/faa5a899-c76e-4539-92ea-70475db51fed',
        title: 'Want to go to… my room?',
        uploadedDate: '2023-10-26T06:01:53+00:00',
      },
      {
        path: '/39403385-3a58-4e71-bfda-6e46952927c1',
        url: 'https://mangadex.org/chapter/39403385-3a58-4e71-bfda-6e46952927c1',
        parent_href: '/chapter/39403385-3a58-4e71-bfda-6e46952927c1',
        title: 'Extended Time...',
        uploadedDate: '2023-10-13T07:55:55+00:00',
      },
    ],
    genres: [
      {
        name: 'Romance',
      },
      {
        name: 'Comedy',
      },
      {
        name: 'Adlt',
      },
    ],
  }

  // create single episode
  const mutateHasura = async () => {
    console.log('mutatedHasura Called')
    try {
      const result = await client.mutate({
        mutation: MANAGA_MUTATE,
        variables: {
          Id: 121,
          title: he.title,
          alternativeName: he.alterNativeName,
          artist: he.artist,
          author: he.author,
          genres: he.genres,
          chapters: he.chapters,
          coverImg: he.coverImage,
          description: he.description,
          slug: he.slug,
          status: he.status,
        },
      })
      console.log('result', result)
    } catch (err) {
      console.log('error while creating mutation', err)
    }
  }

  // fetch single episode from hasura
  const getHasura = async () => {
    console.log('getHasura Called')
    try {
      const result = await client.query({
        query: MANGA_QUERY,
        variables: {
          Id: 20,
        },
      })
      console.log('result', result)
    } catch (err) {
      console.log('error while fetching', err)
    }
  }

  return (
    <div>
      Page
      <button style={{ color: '#fff', fontSize: 40 }} onClick={getHasura}>
        Click Me
      </button>
    </div>
  )
}

export default Page
