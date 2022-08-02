import React from 'react'
import { CCol, CFormSelect, CRow } from '@coreui/react-pro'

const OPageSizeSelect = ({
  handlePageSizeSelectChange,
  options = [20, 40],
  selectedPageSize = 20,
}: {
  handlePageSizeSelectChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void
  options?: number[]
  selectedPageSize?: number
}): JSX.Element => {
  return (
    <CRow className="g-1 align-items-center">
      <CCol xs="auto">
        <p>Display</p>
      </CCol>
      <CCol xs="auto">
        <CFormSelect
          data-testid="paginationTestID"
          size="sm"
          className="mb-3"
          onChange={handlePageSizeSelectChange}
          value={selectedPageSize.toString()}
        >
          {options.map((value, index) => (
            <option key={index} value={value.toString()}>
              {value}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol xs="auto">
        <p>per page</p>
      </CCol>
    </CRow>
  )
}

export default OPageSizeSelect
