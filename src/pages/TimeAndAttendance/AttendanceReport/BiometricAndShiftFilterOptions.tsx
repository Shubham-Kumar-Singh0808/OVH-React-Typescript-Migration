import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { EmployeeShiftDetails } from '../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { BiometricAndShiftFilterOptionsProps } from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const BiometricAndShiftFilterOptions = ({
  isBiometric,
  setIsBiometric,
  employeeRole,
  setSearchEmployee,
  userAccess,
  employeeShifts,
  selectShiftId,
  setSelectShiftId,
  selectMonth,
  isOther,
}: BiometricAndShiftFilterOptionsProps): JSX.Element => {
  const onBiometricHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsBiometric(e.target.value)
  }
  const [searchInput, setSearchInput] = useState<string>('')
  const [filteredShift, setFilteredShift] = useState<EmployeeShiftDetails[]>([])

  const onChangeShiftHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectShiftId(e.target.value)
    console.log(typeof e.target.value)
  }

  const handleSearchButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchEmployee(searchInput)
    }
  }

  useEffect(() => {
    if (selectShiftId) {
      setFilteredShift(
        employeeShifts.filter((shift) => shift.id === Number(selectShiftId)),
      )
    }
  }, [employeeShifts, selectShiftId])

  useEffect(() => {
    if (selectMonth || isOther) {
      setSearchInput('')
    }
  }, [selectMonth, isOther])

  return (
    <>
      <CRow className="mt-3">
        <CCol sm={2} md={3} className="me-2">
          <span>Biometric:</span>
          <CFormSelect
            className="mt-1"
            aria-label="Default select example"
            size="sm"
            id="biometric"
            data-testid="form-select1"
            name="biometric"
            value={isBiometric}
            onChange={onBiometricHandleChange}
          >
            <option value="WithoutBiometric">Without Biometric</option>
            <option value="WithBiometric">With Biometric</option>
          </CFormSelect>
        </CCol>
        {userAccess && (
          <CCol sm={2} md={3}>
            <span className="mb-1">Shift:</span>
            <CFormSelect
              className="mt-1"
              aria-label="Default select example"
              size="sm"
              id="shift"
              data-testid="shift-select"
              name="shiftId"
              value={selectShiftId}
              onChange={onChangeShiftHandler}
            >
              <option value="">All</option>
              {employeeShifts?.map((shift, index) => (
                <option key={index} value={shift.id}>
                  {shift.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        )}
        {selectShiftId && filteredShift && (
          <CCol sm={2} md={3} className="mt-3">
            <CRow>
              <span>{`In Time : ${filteredShift[0]?.startTimeHour} : ${filteredShift[0]?.startTimeMinutes}`}</span>
            </CRow>
            <CRow>
              <span>{`Out Time : ${filteredShift[0]?.endTimeHour} : ${filteredShift[0]?.endTimeMinutes}`}</span>
            </CRow>
          </CCol>
        )}
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
                onKeyDown={handleSearchButton}
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
