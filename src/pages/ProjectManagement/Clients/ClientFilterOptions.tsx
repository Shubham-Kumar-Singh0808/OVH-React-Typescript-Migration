import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'

const ClientFilterOptions = () => {
  return (
    <>
      <CRow>
        <CCol sm={7} className="d-md-flex justify-content-md-end mt-2">
          <CFormCheck
            type="radio"
            name="employmentStatus"
            // value={EmploymentStatus.active}
            id="employmentActive"
            label="All"
            inline
          />
          <CFormCheck
            type="radio"
            name="employmentStatus"
            // value={EmploymentStatus.active}
            id="employmentActive"
            label="Active"
            inline
          />
          <CFormCheck
            type="radio"
            name="employmentStatus"
            // value={EmploymentStatus.active}
            id="employmentActive"
            label="All"
            inline
          />
        </CCol>
        <CCol sm={3}>
          <CRow>
            <CCol sm={12}>
              <CInputGroup className="global-search sh-client-search me-4">
                <CFormInput
                  placeholder="Search Employee"
                  aria-label="Search Employee"
                  aria-describedby="button-addon2"
                />
                <CButton type="button" color="info" id="button-addon2">
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={2}>
          <CRow>
            <CCol sm={12} className="d-md-flex justify-content-md-end pe-0">
              <Link to="/addNewEmployee">
                <CButton color="info" className="text-white btn-ovh" size="sm">
                  <i className="fa fa-plus me-1"></i>
                  Add Employee
                </CButton>
              </Link>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ClientFilterOptions
