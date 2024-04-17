import { Fragment } from 'react'

import Top from '@components/shared/Top'
import HotelItem from '@components/hotel/HotelItem'
import Spacing from '@components/shared/Spacing'
import Navbar from '@components/shared/Navbar'
import useLikeHotels from '@components/hotel/hooks/useLikeHotels'

export default function LikeListPage() {
  const { data: hotels } = useLikeHotels()
  return (
    <div>
      <Navbar />
      <Top title="찜한 호텔" subTitle="" />
      <ul>
        {hotels?.map((hotel, idx) => (
          <Fragment key={hotel.id}>
            <HotelItem hotel={hotel} />
            {hotels.length - 1 !== idx && (
              <Spacing
                size={8}
                backgroundColor="gray100"
                style={{ margin: '20px 0px' }}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  )
}
