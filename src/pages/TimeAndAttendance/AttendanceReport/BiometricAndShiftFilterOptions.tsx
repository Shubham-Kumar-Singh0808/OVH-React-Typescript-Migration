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

const BiometricAndShiftFilterOptions = (): JSX.Element => {
  return (
    <>
      <CRow className="mt-2">
        <CCol sm={2} md={3}>
          <CFormLabel className="mt-1">Biometric:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="biometric"
            data-testid="form-select1"
            name="biometric"
          >
            <option value={''}>Without Biometric</option>
            <option value={''}>With Biometric</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={3}>
          <CFormLabel className="mt-1">Shift:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="shift"
            data-testid="form-select2"
            name="shift"
          >
            <option value={''}>All</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={9}>
          <h5>
            Employee Attendance Summary for <span>June</span>--
            <span>2022</span>
          </h5>
        </CCol>
        <CCol
          sm={3}
          md={3}
          lg={2}
          xl={2}
          className="d-md-flex justify-content-md-end"
        >
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={'searchInput'}
            />
            <CButton
              disabled={false}
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
      <CRow>
        <CCol sm={12}>
          <CCol sm={6}>
            <ul>
              <li>C - Casual</li>
              <li>P - Paid</li>
              <li>L - LOP</li>
              <li>H - Holiday</li>
            </ul>
          </CCol>
          <CCol sm={6} className="d-md-flex justify-content-md-end">
            <ul>
              <li>
                <i className="fa fa-circle low-time"></i>
                Pending
              </li>
              <li>
                <i className="fa fa-circle approved"></i>
                Approved
              </li>
            </ul>
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default BiometricAndShiftFilterOptions
