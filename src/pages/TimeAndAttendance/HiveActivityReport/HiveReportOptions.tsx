import {
  CRow,
  CCol,
  CFormCheck,
  CButton,
  CFormLabel,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'

const HiveReportOptions = (): JSX.Element => {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <div className="mb-3">
            <div className="d-inline">
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="currentMonth"
                label="Current Month"
                inline
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="previousMonth"
                label="Previous Month"
                inline
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                value={'others'}
                id="otherMonth"
                label="Other"
                inline
              />
            </div>
            <div className="d-inline pull-right ml15">
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="Me"
                id="Me"
                label="Me"
                inline
              />
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="All"
                id="All"
                label="All"
                inline
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="time-in-office-report-options">
        <CCol md={12}>
          <CButton
            color="info"
            className="text-white btn-ovh pull-right"
            size="sm"
            // onClick={handleExportAttendance}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export Attendance
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={3} md={1} className="text-end ms-3">
          <CFormLabel className="mt-2 text-decoration-none">
            Month:
            <span>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2} className="text-end pe-2 ms-3 sh-date-picker-column">
          <ReactDatePicker
            id="employeeRealBirthday"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            showMonthYearPicker
            placeholderText="mm/yyyy"
            dateFormat="MM/yyyy"
            name="selectMonth"
            // selected={selectSearchDate}
            onChange={(date: Date) => {
              console.log(date)
            }}
          />
        </CCol>
        <CCol sm={6}>
          <CRow className="align-items-center">
            <CCol sm={4} md={5}>
              <CRow className="ms-3">
                <CCol sm={12}>
                  <CButton
                    color="info btn-ovh me-1"
                    // disabled={!selectEmployeeStatus || !selectSearchDate}
                    // onClick={handleView}
                  >
                    <i className="fa fa-search-plus me-1"></i>
                    View
                  </CButton>
                  &nbsp;&nbsp;
                  <CButton
                    color="info btn-ovh me-0"
                    // disabled={!selectEmployeeStatus && !selectSearchDate}
                    // onClick={handleClear}
                  >
                    <i className="fa fa-refresh me-1"></i>
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={8}>
          <h5 className="sh-summary-text">Employee Attendance Summary for </h5>
        </CCol>

        <CCol sm={4} className="d-md-flex justify-content-md-end">
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Search Employee"
              aria-label="Search Employee"
              // value={searchInput}
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyDown={handleSearchButton}
            />
            <CButton
              disabled={false}
              data-testid="search-employee-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              // onClick={() => {
              //   setSearchEmployee(searchInput)
              // }}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}
export default HiveReportOptions
