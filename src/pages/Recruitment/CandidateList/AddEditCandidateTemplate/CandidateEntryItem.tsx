import { CRow, CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const CandidateEntryItem = ({
  label,
  children,
  showAsterix = false,
}: {
  label: string
  children: React.ReactNode
  showAsterix?: boolean
}) => {
  return (
    <CRow className="mb-3">
      <CCol md={3} className="form-label text-end mt-1">
        <CFormLabel>{label}:</CFormLabel>
        <span className={showAsterix ? TextDanger : TextWhite}>*</span>
      </CCol>
      <CCol md={6}>{children}</CCol>
    </CRow>
  )
}

export default CandidateEntryItem
