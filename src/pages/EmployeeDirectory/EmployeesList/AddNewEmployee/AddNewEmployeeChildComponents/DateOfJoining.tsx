import { CCol, CFormLabel, CRow } from '@coreui/react-pro'

import { DateChangeHandlerProp } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import DatePicker from 'react-datepicker'
import React from 'react'

const DateOfJoining = ({
  dynamicFormLabelProps,
  onDateChangeHandler,
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
          <span
          //   className={
          //     employeeBasicInformationEditData.curentLocation
          //       ? 'text-white'
          //       : 'text-danger'
          //   }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            id="birthday"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="dd/mm/yyyy"
            name="officialBirthday"
            value=""
            onChange={(date: Date) => onDateChangeHandler(date)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default DateOfJoining
