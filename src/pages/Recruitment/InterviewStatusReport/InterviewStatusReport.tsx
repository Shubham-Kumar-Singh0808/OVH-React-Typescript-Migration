import React from 'react'
import { CButton, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import OCard from '../../../components/ReusableComponent/OCard'

const InterviewStatusReport = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Candidate List"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <div className="d-flex flex-row align-items-center gap-5">
        <CCol sm={5}>
          <div className="d-flex flex-row align-items-center">
            <CFormLabel>Select: </CFormLabel>
            <CCol sm={4}>
              <CFormSelect></CFormSelect>
            </CCol>
            <CCol sm={4}>
              <CFormSelect></CFormSelect>
            </CCol>
          </div>
        </CCol>
        <div className="d-flex flex-row">
          <CFormLabel>Technology:</CFormLabel>
          <CFormSelect></CFormSelect>
        </div>
        <div className="d-flex flex-row align-items-center">
          <CFormLabel>Country</CFormLabel>
          <div className="d-flex flex-column">
            <CFormSelect></CFormSelect>
            <CButton className="btn-ovh mt-1" color="info">
              View Status Chart
            </CButton>
          </div>
        </div>
      </div>
    </OCard>
  )
}

export default InterviewStatusReport
