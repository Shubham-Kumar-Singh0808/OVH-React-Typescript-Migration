import {
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'

const AppraisalTemplateViewActionTable = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')

  return (
    <>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={6} md={4}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              data-testid="searchField"
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            <CTableHeaderCell scope="col">KRA</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}

export default AppraisalTemplateViewActionTable
