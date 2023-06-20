import { CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'

const ReviewFormClosedDetailsUI = ({
  label,
  children,
  childrenColNum = 4,
  contentTestId,
}: {
  label: string
  children: React.ReactNode
  childrenColNum?: number
  contentTestId?: string
}): JSX.Element => {
  return (
    <div className="d-flex flex-row align-items-center mb-2">
      <CCol sm={3}>
        <CFormLabel className="text-info">{label}:</CFormLabel>
      </CCol>
      <CCol sm={childrenColNum} data-testid={contentTestId}>
        {children}
      </CCol>
    </div>
  )
}

export default ReviewFormClosedDetailsUI
