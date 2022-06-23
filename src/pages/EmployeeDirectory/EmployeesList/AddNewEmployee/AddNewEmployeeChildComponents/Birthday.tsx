import { CCol, CFormLabel, CRow } from '@coreui/react-pro'

import { DateChangeHandlerProp } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import DatePicker from 'react-datepicker'
import React from 'react'
import { showIsRequired } from '../../../../../utils/helper'

const Birthday = ({
  dynamicFormLabelProps,
  onDateChangeHandler,
  dateValue,
}: DateChangeHandlerProp): JSX.Element => {
  const date = dateValue == null ? '' : dateValue.toLocaleDateString()
  return (
    <CRow className="mb-3">
      <CFormLabel
        {...dynamicFormLabelProps(
          'birthday',
          'col-sm-3 col-form-label text-end',
        )}
      >
        Birthday:
        <span className={showIsRequired(date)}>*</span>
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
          placeholderText="Select birth date"
          name="birthday"
          value={date}
          onChange={(date: Date) => onDateChangeHandler(date)}
        />
      </CCol>
    </CRow>
  )
}

export default Birthday
