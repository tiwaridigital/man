export const imageUpload = () => {
  console.log('uploadImage called')
  const FormData = require('form-data')
  let data = new FormData()
  data.append(
    'image',
    'https://uploads.mangadex.org/data/04e12b8f9dcf8a68bec3f61633bfdef0/z1-aa3688f681533e9fa53ede12bb13da0d53d87ea4c7b0232bdc21cfccf83888b5.jpg'
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

export const imgBBUpload = async (imageUrl) => {
  const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_SECRET}&image=${imageUrl}`
  const response = await fetch(url, {
    method: 'POST',
  })
  const result = await response.json()
  return result
  // console.log('imgbb upload', result)
}
