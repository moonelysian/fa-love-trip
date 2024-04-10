import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { onSnapshot, collection, doc } from 'firebase/firestore'

import { getRooms } from '@remote/room'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

export default function useRooms({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))
        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    return () => unsubscribe()
  }, [client, hotelId])

  return useQuery(['rooms', hotelId], () => getRooms(hotelId))
}
