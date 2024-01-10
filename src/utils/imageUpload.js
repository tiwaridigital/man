import axios from 'axios'
import sharp from 'sharp'
import getImageBuffer from '@/app/_actions/getImageBuffer'
export const convertImage = async (format, url) => {
  console.log('convertImage called')
  try {
    // Fetch the image buffer from the URL
    const { data } = await axios.get(url, { responseType: 'arraybuffer' })
    console.log('axios buffer', data)
    // convert Image to png Buffer
    const convertedImageBuffer = await sharp(data).toFormat(format).toBuffer()
    // console.log('convertedImageBuffer', convertedImageBuffer)
    const image = imageUpload(convertedImageBuffer.toString('base64'))
    console.log('image inside convertImage', image)
    // return convertedImageBuffer.toString('base64')
  } catch (err) {
    console.log('Error converting image', err)
  }
}

export const imageUpload = async (imageBuffer = '', type, url) => {
  console.log('uploadImage called', type)
  const FormData = require('form-data')
  let data = new FormData()
  data.append('image', type === 'base64' ? imageBuffer : url)
  data.append('type', type)
  // data.append('name', 'macbook.png')
  // data.append('title', 'Macbook Air M1')
  // data.append('description', 'This is an macbook air m1 image.')

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
  // let data =
  return axios
    .request(config)
    .then((response) => {
      // console.log('response')
      // console.log(JSON.stringify(response.data))
      return JSON.stringify(response.data)
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
    })
}

export const imgBBUpload = async (imageUrl, uploadType) => {
  if (uploadType == 'remote') {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_SECRET}&image=${imageUrl}`
    const response = await fetch(url, {
      method: 'POST',
    })
    const result = await response.json()
    return result
  } else {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_SECRET}`
    const data = new FormData()
    data.append('image')
  }
}

export const cloudFlareR2 = async (fileName, imageUrl) => {
  const bufferResult = await getImageBuffer(imageUrl)
  const buffer = new Uint8Array(
    atob(bufferResult)
      .split('')
      .map((char) => char.charCodeAt(0))
  )

  // console.log('buffer', buffer);
  console.log('fileName', imageUrl)

  const response = await fetch('http://localhost:3000/api/cloudFlareUpload', {
    method: 'POST',
    body: JSON.stringify({
      fileName,
    }),
  })

  const { url } = await response.json()
  console.log('response url', url)

  const uploaded = await fetch(url, {
    method: 'PUT',
    body: buffer,
  })

  // console.log('uploaded', uploaded)
}

export const bunnyCDNUpload = async (fileName, imageUrl) => {
  // Fetch the image buffer from the URL
  const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  console.log('axios buffer', data)
  // pass imageBuffer in data
  let config = {
    method: 'PUT',
    maxBodyLength: Infinity,
    url: `https://sg.storage.bunnycdn.com/manbro/${fileName}`,
    headers: {
      AccessKey: '776a97b6-bc36-41e8-911050acf170-91dd-453b',
      'Content-Type': 'application/octet-stream',
    },
    data: data,
  }

  return axios
    .request(config)
    .then((response) => {
      console.log('uploaded', response.data)
    })
    .catch((err) => {
      console.log('error uploading', err)
    })
}
