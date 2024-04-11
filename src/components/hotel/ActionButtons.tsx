import { CopyToClipboard } from 'react-copy-to-clipboard'

import { css } from '@emotion/react'
import useKakaoShare from '@/hooks/useKakaoShare'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { Hotel } from '@models/hotel'
import useLike from '@hooks/useLike'
import { IMAGE_URL } from '@constants'

export default function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useKakaoShare()
  const { id, name, comment, mainImageUrl } = hotel
  const { isLiked, toggleLike } = useLike(id)

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={toggleLike}
        iconUrl={isLiked ? IMAGE_URL.LIKED : IMAGE_URL.UNLIKED}
      />
      <Button
        label="공유하기"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Love Trip에서 보기',
          })
        }}
        iconUrl="/images/kakaotalk_sharing_btn_small_ov.png"
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => alert('링크가 복사되었습니다.')}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-36-512.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;
  & * {
    flex: 1;
  }
`
