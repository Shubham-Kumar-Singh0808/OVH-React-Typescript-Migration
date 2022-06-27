import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'

import React, { useState } from 'react'
import { BiometricAndShiftFilterOptionsProps } from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const BiometricAndShiftFilterOptions = ({
  biometric,
  setBiometric,
  employeeRole,
  setSearchEmployee,
}: BiometricAndShiftFilterOptionsProps): JSX.Element => {
  const onBiometricHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBiometric(e.target.value)
  }
  const [searchInput, setSearchInput] = useState<string>('')
  return (
    <>
      <CRow className="mt-3">
        <CCol sm={2} md={3} className="me-2">
          <span>Biometric:</span>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="biometric"
            data-testid="form-select1"
            name="biometric"
            value={biometric}
            onChange={onBiometricHandleChange}
          >
            <option value="WithoutBiometric">Without Biometric</option>
            <option value="WithBiometric">With Biometric</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={3}>
          <span>Shift:</span>
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
        <CCol sm={8}>
          <h5 className="sh-summary-text">
            Employee Attendance Summary for <span>June</span>--
            <span>2022</span>
          </h5>
        </CCol>
        {(employeeRole === 'admin' ||
          employeeRole === 'HR' ||
          employeeRole === 'HR Manager') && (
          <CCol sm={4} className="d-md-flex justify-content-md-end">
            <CInputGroup className="global-search me-0">
              <CFormInput
                placeholder="Search Employee"
                aria-label="Search Employee"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <CButton
                disabled={false}
                data-testid="search-employee-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={() => {
                  setSearchEmployee(searchInput)
                }}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        )}
        <CCol sm={12} className="d-md-flex mt-2">
          <CCol sm={9}>
            <ul className="time-in-office-indications ps-2">
              <li>C - Casual</li>
              <li>P - Paid</li>
              <li>L - LOP</li>
              <li>H - Holiday</li>
            </ul>
          </CCol>
          <CCol sm={3}>
            <ul className="time-in-office-indications">
              <li>
                <i className="fa fa-circle low-time"></i>&nbsp; Pending
              </li>
              <li>
                <i className="fa fa-circle approved"></i>&nbsp; Approved
              </li>
            </ul>
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default BiometricAndShiftFilterOptions
