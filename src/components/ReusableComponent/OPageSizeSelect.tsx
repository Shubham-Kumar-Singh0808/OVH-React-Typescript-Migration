import { CCol, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'

const OPageSizeSelect = ({
  handlePageSizeSelectChange,
}: {
  handlePageSizeSelectChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void
}): JSX.Element => {
  return (
    <CRow className="g-1 align-items-center">
      <CCol xs="auto">
        <p>Display</p>
      </CCol>
      <CCol xs="auto">
        <CFormSelect
          size="sm"
          className="mb-3"
          onChange={handlePageSizeSelectChange}
        >
          <option value="20">20</option>
          <option value="40">40</option>
        </CFormSelect>
      </CCol>
      <CCol xs="auto">
        <p>per page</p>
      </CCol>
    </CRow>
  )
}

export default OPageSizeSelect
