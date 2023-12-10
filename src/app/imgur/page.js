// 'use client'
import React from 'react'
const FormData = require('form-data')

import Imgur from '@/components/Imgur/Index'
import axios from 'axios'
import { convertImage } from '@/utils/imageUpload'
const Page = async () => {
  let htmlContent = ''
  const authorizeUser = () => {
    console.log('authorizeUser called')
    const clientId = '58ee55141a2f9c0'
    const clientSecret = '665252f3995b551c42672783848b599cddf308e6'
    // paste this url in browser and grant user access -> to get response i.e. access_token & refresh_token
    const url = `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=token&state=APPLICATION_STATE`
    axios.get(url).then((res) => {
      console.log('res', res)
      htmlContent = res.data
    })

    const response =
      'http://localhost:3000/imgur?state=APPLICATION_STATE#access_token=a04ec5b712b86fbd664122e0a0404035bdd96f8b&expires_in=315360000&token_type=bearer&refresh_token=415ea571c8e00ec53ab180db433df89932a42d67&account_username=UjjwalKumar494&account_id=37069754'
  }

  const getData = () => {
    console.log('getData called')
    let data = new FormData()
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/image/ZeAg3aN',
      headers: {
        Authorization: 'Client-ID 58ee55141a2f9c0',
        ...data.getHeaders(),
      },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        console.log('response')
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
  }

  // getData()

  const uploadImage = () => {
    console.log('uploadImage called')
    const FormData = require('form-data')
    let data = new FormData()
    data.append(
      'image',
      'https://img.asuracomics.com/unsafe/fit-in/720x936/https://asuratoon.com/wp-content/uploads/2023/08/CoverFinal.png'
      // 'https://cdn.toonily.com/chapters/manga_62aa6a6a409c9/53f194e03f5316e8274e42091ac7ffc7/001.jpg'
      // 'https://uploads.mangadex.org/data/04e12b8f9dcf8a68bec3f61633bfdef0/z1-aa3688f681533e9fa53ede12bb13da0d53d87ea4c7b0232bdc21cfccf83888b5.jpg'
    )
    data.append('type', 'url')
    data.append('name', 'macbook.webp')
    data.append('title', 'Macbook Air M1')
    data.append('description', 'This is an macbook air m1 image.')

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/upload',
      headers: {
        Authorization: 'Bearer 80a8d3e2afa3486e87d47ed2fecdde4f7c7e4218',
        // ...data.getHeaders(),
      },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        console.log('response')
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
  }
  // uploadImage()

  const upload = await convertImage(
    'png',
    'https://asuratoon.com/wp-content/uploads/2023/11/02-8.webp'
  )

  console.log('upload', upload)
  return (
    <div>
      <h1 className='text-[40px]'>Imgur</h1>
      <Imgur />
    </div>
  )
}

export default Page
