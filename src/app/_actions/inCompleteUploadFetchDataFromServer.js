'use server';
import { inCompleteUploadFetchData } from '@/utils/admin/data/incomplete-upload/fetchData';

export async function inCompleteUploadFetchDataFromServer(
  src,
  url,
  completedChapters,
) {
  const data = await inCompleteUploadFetchData(src, url, completedChapters);
  return data;
}
