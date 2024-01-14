'use server';
import axios from 'axios';

export default async function getImageBuffer(url) {
  const res = await axios({
    method: 'get',
    url: url,
    responseType: 'arraybuffer',
  });

  return Buffer.from(res.data);
}
