import { CButton, CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import {
  EmployeeStatus,
  OtherFilterOptionsProps,
} from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const OtherFilterOptions = ({
  setFilterByEmployeeStatus,
  setFilterByDate,
}: OtherFilterOptionsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [selectEmployeeStatus, setSelectEmployeeStatus] = useState<string>('')
  const [selectSearchDate, setSelectSearchDate] = useState<Date | null>()

  const onChangeEmployeeStatusHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectEmployeeStatus(e.target.value)
  }

  const onChangeSelectMonthHandler = (date: Date) => {
    setSelectSearchDate(date)
  }

  const handleClear = () => {
    setSelectEmployeeStatus('')
    setSelectSearchDate(null)
  }

  const handleView = () => {
    setFilterByEmployeeStatus(selectEmployeeStatus)
    if (selectSearchDate) {
      setFilterByDate(selectSearchDate)
      dispatch(
        reduxServices.employeeAttendanceReport.actions.setMonthDisplay(
          moment(selectSearchDate).format('MMMM-YYYY'),
        ),
      )
    }
  }

  return (
    <>
      <CRow>
        <CCol sm={3} md={1} className="text-end ms-3">
          <CFormLabel className="mt-2 text-decoration-none">
            Month:
            <span className={selectSearchDate ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={1} className="text-end pe-2 ms-3 sh-date-picker-column">
          <DatePicker
            autoComplete="off"
            id="employeeRealBirthday"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            showMonthYearPicker
            placeholderText="mm/yyyy"
            dateFormat="MM/yyyy"
            name="selectMonth"
            selected={selectSearchDate}
            onChange={(date: Date) => {
              onChangeSelectMonthHandler(date)
            }}
          />
        </CCol>
        <CCol sm={6}>
          <CRow className="mt-1 align-items-center">
            <CCol sm={4} lg={3} className="text-end">
              <span>Employee Status:</span>
            </CCol>
            <CCol sm={2} className="text-end">
              <CFormCheck
                className="mt-1"
                type="radio"
                name="employmentStatus"
                id="active"
                label="Active"
                value={EmployeeStatus.active}
                checked={selectEmployeeStatus === EmployeeStatus.active}
                onChange={onChangeEmployeeStatusHandler}
                inline
              />
            </CCol>
            <CCol sm={2}>
              <CFormCheck
                className="mt-1"
                type="radio"
                name="employmentStatus"
                id="inActive"
                label="Inactive"
                value={EmployeeStatus.inactive}
                checked={selectEmployeeStatus === EmployeeStatus.inactive}
                onChange={onChangeEmployeeStatusHandler}
                inline
              />
            </CCol>
            <CCol sm={4} md={5}>
              <CRow>
                <CCol sm={12}>
                  <CButton
                    color="info btn-ovh me-1"
                    disabled={!selectEmployeeStatus || !selectSearchDate}
                    onClick={handleView}
                  >
                    <i className="fa fa-search-plus me-1"></i>
                    View
                  </CButton>
                  &nbsp;&nbsp;
                  <CButton
                    color="info btn-ovh me-0"
                    disabled={!selectEmployeeStatus && !selectSearchDate}
                    onClick={handleClear}
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
    </>
  )
}

export default OtherFilterOptions
