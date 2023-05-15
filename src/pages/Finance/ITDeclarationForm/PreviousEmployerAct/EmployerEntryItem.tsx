import { CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'

const EmployerEntryItem = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}): JSX.Element => {
  return (
    <CCol sm={12} md={4} className="d-flex flex-row align-items-center">
      <CCol sm={12} md={4}>
        <CFormLabel className="col-form-label text-end">{label}:</CFormLabel>
      </CCol>
      <CCol sm={12} md={7}>
        {children}
      </CCol>
    </CCol>
  )
}

export default EmployerEntryItem
