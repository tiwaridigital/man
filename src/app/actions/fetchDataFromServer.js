'use server'
import { fetchData } from '../../../utils/data/fetchData'

export async function fetchDataServerAction(name) {
  const data = await fetchData(name)
  return data
}
