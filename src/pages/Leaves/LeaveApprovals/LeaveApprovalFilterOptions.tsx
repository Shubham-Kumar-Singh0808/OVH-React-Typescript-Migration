import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'

const LeaveApprovalFilterOptions = () => {
  return (
    <>
      <CRow>
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Period:
        </CFormLabel>
        <CCol sm={3}></CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Team Member:
        </CFormLabel>
        <CCol sm={3}></CCol>
      </CRow>
      <CRow>
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Status:
        </CFormLabel>
        <CCol sm={3}></CCol>
      </CRow>
    </>
  )
}

export default LeaveApprovalFilterOptions
