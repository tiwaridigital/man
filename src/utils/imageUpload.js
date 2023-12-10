import axios from 'axios'
import sharp from 'sharp'
export const convertImage = async (format, url) => {
  console.log('convertImage called')
  try {
    // Fetch the image buffer from the URL
    const { data } = await axios.get(url, { responseType: 'arraybuffer' })
    console.log('axios buffer', data)
    // convert Image to png Buffer
    const convertedImageBuffer = await sharp(data).toFormat(format).toBuffer()
    // console.log('convertedImageBuffer', convertedImageBuffer)
    // const image = imageUpload(convertedImageBuffer.toString('base64'))
    // console.log('image inside convertImage', image)
    return convertedImageBuffer.toString('base64')
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

export const imgBBUpload = async (imageUrl) => {
  const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_SECRET}&image=${imageUrl}`
  const response = await fetch(url, {
    method: 'POST',
  })
  const result = await response.json()
  return result
}
