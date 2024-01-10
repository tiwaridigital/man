'use server';
import axios from 'axios';

export default async function getImageBuffer(url) {
  const res = await axios({
    method: 'get',
    url: url,
    responseType: 'arraybuffer',
  });

  const base64String = Buffer.from(res.data).toString('base64');
  // console.log('response buffer', base64String);
  return base64String;
}
