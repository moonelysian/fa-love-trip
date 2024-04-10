import { useQuery } from 'react-query'

import { getHotel } from '@remote/hotel'

export default function useHotel({ id }: { id: string }) {
  return useQuery(['hotel', id], () => getHotel(id))
}
