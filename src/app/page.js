import HeroBanner from '@/components/heroBanner/HeroBanner';
import Trending from '@/components/trending/Trending';
import fetchAllMangas from '../utils/data/fetchAllMangas';
import { unstable_noStore as noStore } from 'next/cache';
import MangaCardsContainer from '@/components/mangaCardsContainer/MangaCardsContainer';

export const metadata = {
  title: 'Manga - Best Comics, High Quality Comics & Manga',
};
export default async function Home() {
  noStore();
  const data = await fetchAllMangas();
  return (
    <div>
      <HeroBanner />
      <Trending data={data} title={'Trending'} />
      <MangaCardsContainer items={data.slice(0, 6)} />
    </div>
  );
}
