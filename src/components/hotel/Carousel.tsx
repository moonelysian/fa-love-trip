import { css } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={imageUrl}>
            <img
              src={imageUrl}
              alt={`${idx + 1}번째 호텔 이미지`}
              css={imageStyle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`

const imageStyle = css`
  width: 100%;
  height: 100%;
`
