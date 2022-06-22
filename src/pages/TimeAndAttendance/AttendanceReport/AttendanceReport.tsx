import { CButton, CCol, CFormCheck, CRow } from '@coreui/react-pro'

import BiometricAndShiftFilterOptions from './BiometricAndShiftFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import OtherFilterOptions from './OtherFilterOptions'
import React from 'react'

const AttendanceReport = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Attendance Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12}>
            <div className="mb-3">
              <div className="d-inline">
                <CFormCheck
                  type="radio"
                  name="currentMonth"
                  id="currentMonth"
                  label="Current Month"
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="previousMonth"
                  id="previousMonth"
                  label="Previous Month"
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="other"
                  id="other"
                  label="Other"
                  inline
                />
              </div>
              <div className="d-inline pull-right ml15">
                <CButton color="info btn-ovh me-0">
                  <i className="fa fa-plus me-1"></i>
                  Click to Export Attendance
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
        <OtherFilterOptions />
        <BiometricAndShiftFilterOptions />
      </OCard>
    </>
  )
}
export default AttendanceReport
