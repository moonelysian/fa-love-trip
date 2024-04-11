import { useState } from 'react'

export default function useLike(hotelId: string) {
  const STORAGE_KEY = 'likes'
  const items = localStorage.getItem(STORAGE_KEY)
  const [isLiked, setIsLiked] = useState(items?.includes(hotelId))

  const toggleLike = () => {
    setIsLiked(!isLiked)
    const idStrs = localStorage.getItem(STORAGE_KEY)
    if (!idStrs) return localStorage.setItem(STORAGE_KEY, `${hotelId}`)

    const idArr = idStrs.split(',')
    if (idArr.includes(hotelId)) {
      return localStorage.setItem(
        STORAGE_KEY,
        idArr.filter((id) => id !== hotelId).join(','),
      )
    }
    return localStorage.setItem('likes', [...idArr, hotelId].join(','))
  }

  return { isLiked, toggleLike }
}
