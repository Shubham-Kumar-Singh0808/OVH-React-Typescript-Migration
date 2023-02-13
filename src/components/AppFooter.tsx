import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()
  return (
    <CFooter className="main-footer">
      Copyright &copy; Ray Business Technologies {currentYear}
    </CFooter>
  )
}

export default React.memo(AppFooter)
