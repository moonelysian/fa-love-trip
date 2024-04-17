import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'

function Navbar() {
  const location = useLocation()
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      <Flex justify="space-between" align="center" css={{ gap: 12 }}>
        {location.pathname !== '/likes' && <Link to="/likes">찜목록</Link>}
        {location.pathname !== '/reservation/list' && (
          <Link to="/reservation/list">예약목록</Link>
        )}
      </Flex>
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
