import { CButton, CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'

import DatePicker from 'react-datepicker'
import React from 'react'

const OtherFilterOptions = (): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol sm={3} md={1} className="text-end ms-3">
          <CFormLabel className="mt-1 text-decoration-none">
            Month:<span className="text-danger">*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={1} className="text-end pe-2 ms-3">
          <DatePicker
            id="employeeRealBirthday"
            className="form-control form-control-sm sh-date-picker"
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
          <CRow className="mt-1">
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel>Employee Status:</CFormLabel>
            </CCol>
            <CCol sm={2} className="text-end">
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
              <CButton color="info btn-ovh me-1">
                <i className="fa fa-search-plus me-1"></i>
                View
              </CButton>
              &nbsp;&nbsp;
              <CButton color="info btn-ovh me-0">
                <i className="fa fa-refresh me-1"></i>
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default OtherFilterOptions
