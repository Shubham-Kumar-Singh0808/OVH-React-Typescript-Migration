import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { showIsRequired } from '../../../../utils/helper'

const EventFromDate = ({
  fromDateValue,
  fromDateChangeHandler,
}: {
  fromDateChangeHandler: (e: Date) => void
  fromDateValue: string
}): JSX.Element => {
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-2 col-form-label text-end">
        From Date:
        <span className={showIsRequired(fromDateValue)}>*</span>
      </CFormLabel>
      <CCol sm={4}>
        <ReactDatePicker
          id="fromDate"
          data-testid="dateOptionSelect"
          className="form-control form-control-sm sh-date-picker sh-leave-form-control"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          minDate={new Date()}
          dropdownMode="select"
          dateFormat="dd/mm/yy"
          placeholderText="DD/MM/YY"
          name="fromDate"
          value={fromDateValue}
          onChange={(date: Date) => fromDateChangeHandler(date)}
        />
      </CCol>
    </CRow>
  )
}

export default EventFromDate
