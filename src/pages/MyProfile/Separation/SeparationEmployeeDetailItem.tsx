import { CRow, CCol } from '@coreui/react-pro'
import React from 'react'

const SeparationEmployeeDetailItem = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}): JSX.Element => {
  return (
    <CRow>
      <CCol sm={2} className="text-end">
        <label className="form-label">{label}:</label>
      </CCol>
      <CCol sm={10}>
        <div>{children}</div>
      </CCol>
    </CRow>
  )
}

export default SeparationEmployeeDetailItem
