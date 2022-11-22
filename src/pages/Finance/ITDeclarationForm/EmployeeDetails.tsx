import { CRow, CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'

const EmployeeDetails = (): JSX.Element => {
  return (
    <>
      <CCol>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employee Id:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            1983
          </CCol>
          <CFormLabel className="col-sm-3 col-form-label">
            Employee Name:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            Sai Kiran Banothu
          </CCol>
        </CRow>
        <CRow>
          <CFormLabel className="col-sm-3 col-form-label text-end">
            PAN:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            EPHPB9210R
          </CCol>
          <CFormLabel className="col-sm-3 col-form-label">
            Designation:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            Software Engineer
          </CCol>
        </CRow>
      </CCol>
    </>
  )
}

export default EmployeeDetails
