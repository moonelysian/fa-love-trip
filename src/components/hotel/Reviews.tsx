import { ChangeEvent, useCallback, useState } from 'react'
import { format } from 'date-fns'
import useReview from './hooks/useReview'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import { IMAGE_URL } from '@constants'

export default function Reviews({ hotelId }: { hotelId: string }) {
  const { reviews, isLoading, write } = useReview({ hotelId })

  const [text, setText] = useState<string>('')

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img src={IMAGE_URL.MESSAGE_OPEN} alt="" />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요 !
          </Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={<img src={IMAGE_URL.PROFILE} alt="" width={40} height={40} />}
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
          />
        ))}
      </ul>
    )
  }, [reviews])

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      <div style={{ padding: '0 24px' }}>
        <TextField value={text} onChange={handleTextChange} />
        <Spacing size={6} />
        <Flex justify="flex-end">
          <Button
            disabled={text === ''}
            onClick={async () => {
              const success = await write(text)
              if (success === true) {
                console.log('aaaa')
                setText('')
              }
            }}
          >
            작성
          </Button>
        </Flex>
      </div>
    </div>
  )
}
