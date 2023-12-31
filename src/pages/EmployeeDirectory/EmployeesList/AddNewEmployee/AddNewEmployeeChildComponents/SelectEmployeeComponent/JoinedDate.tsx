import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React from 'react'
import { DateChangeHandlerProp } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const DateOfJoining = ({
  dynamicFormLabelProps,
  onDateChangeHandler,
  dateValue,
}: DateChangeHandlerProp): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'dateofJoining',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Date of Joining:
          <span className={showIsRequired(dateValue)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            id="joinedDate"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yy"
            name="joinedDate"
            value={dateValue}
            onChange={(date: Date) => onDateChangeHandler(date)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default DateOfJoining
