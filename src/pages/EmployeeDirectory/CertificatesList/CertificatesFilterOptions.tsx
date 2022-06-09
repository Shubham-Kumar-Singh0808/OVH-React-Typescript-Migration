import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'

import React from 'react'

const CertificatesFilterOptions = (): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Technology:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="department"
            data-testid="form-select"
            name="department"
          >
            <option value={''}>Select Technology</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={2} className="text-end">
          <CFormLabel className="mt-1">Certificate Type:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="department"
            data-testid="form-select"
            name="department"
          >
            <option value={''}>Select Certificate</option>
          </CFormSelect>
        </CCol>
        <CCol xs={5} className="gap-2 d-md-flex justify-content-md-end">
          <CButton color="info btn-ovh me-0">
            <i className="fa fa-plus  me-1"></i>Add Certificate Type
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton disabled={false} color="success btn-ovh me-1">
            View
          </CButton>
          <CButton disabled={false} color="warning btn-ovh me-1">
            Clear
          </CButton>
        </CCol>
        <CCol xs={3} className="gap-2 d-md-flex justify-content-md-end">
          <CButton color="info btn-ovh me-0">
            <i className="fa fa-plus  me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={4} className="gap-2 d-md-flex">
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
            />
            <CButton type="button" color="info" id="button-addon2">
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default CertificatesFilterOptions
