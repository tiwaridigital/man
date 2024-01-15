import { sanityClient } from '../../../../sanityClient';
import { slugify } from '@/utils/helpers';
const arr = [
  [
    {
      id: 14,
      src_origin: 'https://i.ibb.co/2qtZCCs/000-The-Priest-of-Corruption.jpg',
    },
    { id: 14, src_origin: 'https://i.ibb.co/NC8w40V/01.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/413wM8N/02.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/cTNmN4S/03.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/gD92gt4/04.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/sC0Vybw/05.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/GpzTpTJ/06.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/D4PSFbf/07.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/zXB2YkK/08.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/MM3k0jm/09.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/8sYDtnW/10.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/SdMVyfy/11.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/QDMQmGZ/12.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/hCFBK1s/13.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/P4wm281/14.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/GFzh47s/15.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/NFr0Qh0/16.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/tcpHZsN/17.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/zNGrWqS/18.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/M575J7j/19.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/pzmykCq/20.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/M7Rn6tb/21.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/0DLpSRp/22.jpg' },
    { id: 14, src_origin: 'https://i.ibb.co/jhx8gfR/23.jpg' },
  ],
  [
    { id: 13, src_origin: 'https://i.ibb.co/KFzDLxF/00.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/WfGvmNF/01.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/HXcspBQ/02.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/7vwgfHz/03.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/nwgT1BP/04.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/NV87MCf/05.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/Z1LQ0ZB/06.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/tZjPVPq/07.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/z72km8h/08.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/Gch4jWs/09.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/SwVQjDd/10.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/RSGr8J0/11.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/gJNsGbT/12.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/fQ12KqH/13.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/QrGc75T/14.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/9gnBwpW/15.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/Kh2zWr8/16.jpg' },
    { id: 13, src_origin: 'https://i.ibb.co/TYc6Hs5/17.jpg' },
  ],
];

const title = 'The Priest of Corruption';

export default async function deleteImgBB(imagesArr, title) {
  console.log('deleteImgBB called');

  for (const outerArr of imagesArr) {
    const idx = imagesArr.indexOf(outerArr);
    console.log('outerArr', idx);
    const chapterObj = {
      _type: 'chapters',
      slug: slugify(title),
      data: outerArr.map((x, idx) => ({
        _key: idx.toString(),
        id: idx.toString(),
        src_origin: x.src_origin,
      })),
      title: title,
    };

    const result = await sanityClient.create(chapterObj);
    console.log('result', result);
  }
}
