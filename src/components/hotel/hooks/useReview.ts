import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getReviews, writeReview } from '@remote/review'

export default function useReview({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()

  const { data: reviews, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      await writeReview({
        createdAt: new Date(),
        hotelId,
        text,
      })
      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  return { reviews, isLoading, write }
}
