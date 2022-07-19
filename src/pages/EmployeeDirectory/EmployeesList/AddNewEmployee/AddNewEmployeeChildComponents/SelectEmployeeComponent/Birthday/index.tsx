import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React from 'react'
import { DateChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../../utils/helper'

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
        data-testid="date-picker-title"
      >
        Birthday:
        <span className={showIsRequired(date)}>*</span>
      </CFormLabel>
      <CCol sm={3}>
        <DatePicker
          id="birthday"
          data-testid="birthday-date-picker"
          className="form-control form-control-sm sh-date-picker"
          maxDate={new Date()}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="dd/mm/yy"
          placeholderText="dd/mm/yy"
          name="birthday"
          value={date}
          onChange={(date: Date) => onDateChangeHandler(date)}
        />
      </CCol>
    </CRow>
  )
}

export default Birthday
