import HeroBanner from '@/components/heroBanner/HeroBanner';
import Trending from '@/components/trending/Trending';
import fetchAllMangas from '../utils/data/fetchAllMangas';
import { unstable_noStore as noStore } from 'next/cache';
import MangaCardsContainer from '@/components/mangaCardsContainer/MangaCardsContainer';

export const metadata = {
  title: 'Manga - Best Comics, High Quality Comics & Manga',
  description:
    'Read manga online free at MangaStory, mangadex, update fastest, synthesized 24h free with high-quality images. We hope to bring you happy moments',
  keywords:
    'read manga online, asuratoon manga, mangadex, read manhua, manga online, free manga, manga reader, manga scans, manga raw, manga, manhwa, manhua, mangastory, mangastory.org',
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
