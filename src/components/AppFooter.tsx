import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()

  return (
    <CFooter className="main-footer">
      {localStorage.getItem('tenantKey') === 'RAYBIZTECH'
        ? `Copyright © Ray Business Technologies ${currentYear}`
        : `Copyright © AIBridgeML${currentYear}`}
    </CFooter>
  )
}

export default React.memo(AppFooter)
