import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getLikeHotels } from '@remote/hotel'

export default function useLikeHotels() {
  const [hotelIds, setHotelIds] = useState<string[]>([])

  useEffect(() => {
    const likes = localStorage.getItem('likes')
    if (!likes) return

    setHotelIds(likes.split(','))
  }, [])

  return useQuery(
    ['likeHotels', JSON.stringify(hotelIds)],
    () => getLikeHotels(hotelIds),
    {
      enabled: hotelIds.length > 0,
    },
  )
}
