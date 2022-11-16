import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'

const AssignTemplateTable = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  return (
    <>
      <CRow className="gap-2 d-md-flex justify-content-md-end mt-3">
        <CCol xs={12} sm={3}>
          <CInputGroup className="global-search me-0 sh-client-search">
            <CFormInput
              className="form-control-not-allowed"
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              data-testid="searchField"
              value={searchInput}
              disabled={true}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              data-testid="search-btn1"
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
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="success"
          >
            Save
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default AssignTemplateTable
