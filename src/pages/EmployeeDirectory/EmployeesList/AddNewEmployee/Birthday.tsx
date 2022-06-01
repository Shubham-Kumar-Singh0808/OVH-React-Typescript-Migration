import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'

import { DateChangeHandlerProp } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import DatePicker from 'react-datepicker'
import React from 'react'

const Birthday = ({
  dynamicFormLabelProps,
  onDateChangeHandler,
}: DateChangeHandlerProp): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'birthday',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Birthday:
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

export default Birthday
