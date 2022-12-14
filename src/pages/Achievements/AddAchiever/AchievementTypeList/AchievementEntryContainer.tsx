import { CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'

const AchievementEntryContainer = ({
  label,
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  return (
    <CRow className="mt-4 mb-4 align-items-center">
      <CFormLabel className="col-sm-3 col-form-label text-end">
        {label}
      </CFormLabel>
      {children}
    </CRow>
  )
}

export default AchievementEntryContainer
