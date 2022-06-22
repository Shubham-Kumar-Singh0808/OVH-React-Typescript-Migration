import { CRow, CCol, CButton, CFormCheck, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import DatePicker from 'react-datepicker'

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
        <CRow>
          <CCol sm={2} md={1}>
            <CFormLabel className="mt-1">Month:</CFormLabel>
          </CCol>
          <CCol sm={1}>
            <DatePicker
              id="employeeRealBirthday"
              className="form-control form-control-sm"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="mm/yyyy"
              dateFormat="mm/yyyy"
              name="realBirthday"
              //   value={employeeBasicInformationEditData.officialBirthday}
              onChange={(date: Date) => {
                console.log(date)
              }}
            />
          </CCol>
          <CCol sm={4}>
            <CRow>
              <CCol sm={4} lg={5} className="text-end">
                <CFormLabel className="mt-1">Employee Status:</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <CFormCheck
                  type="radio"
                  name="employmentStatus"
                  id="active"
                  label="Active"
                  inline
                />
              </CCol>
              <CCol sm={2}>
                <CFormCheck
                  type="radio"
                  name="employmentStatus"
                  id="inActive"
                  label="Inactive"
                  inline
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={2}>
            <CRow>
              <CCol sm={12}>
                <CButton color="info btn-ovh me-0">
                  <i className="fa fa-search-plus me-1"></i>
                  View
                </CButton>
                &nbsp;
                <CButton color="info btn-ovh me-0">
                  <i className="fa fa-refresh me-1"></i>
                  Clear
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}
export default AttendanceReport
