'use server'
import { fetchData } from '../../utils/admin/data/fetchData'

export async function fetchDataServerAction(src, url) {
  const data = await fetchData(src, url)
  return data
}
