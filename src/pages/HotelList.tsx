import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Top from '@components/shared/Top'
import useHotels from '@components/hotel/hooks/useHotels'
import HotelItem from '@/components/hotel/HotelItem'
import Spacing from '@/components/shared/Spacing'

const HotelListPage = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가 숙소 예약" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
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
      </InfiniteScroll>
    </div>
  )
}

export default HotelListPage
