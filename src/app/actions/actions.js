'use server'
import { fetchData } from '../../../utils/data/fetchData'

export async function myAction(name) {
  const data = await fetchData(name)
  return data
}
