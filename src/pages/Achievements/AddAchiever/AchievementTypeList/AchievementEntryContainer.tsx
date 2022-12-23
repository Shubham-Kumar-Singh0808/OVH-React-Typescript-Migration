import { CRow } from '@coreui/react-pro'
import React from 'react'

const AchievementEntryContainer = ({
  children,
  customClass,
}: {
  children: React.ReactNode
  customClass?: string | undefined
}): JSX.Element => {
  return (
    <CRow
      className={customClass ? customClass : 'mt-3 mb-3 align-items-center'}
    >
      {children}
    </CRow>
  )
}

export default AchievementEntryContainer
