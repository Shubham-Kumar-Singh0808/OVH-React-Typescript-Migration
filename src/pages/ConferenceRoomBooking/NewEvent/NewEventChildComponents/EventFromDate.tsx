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
      <CFormLabel className="col-sm-3 col-form-label text-end">
        From Date :<span className={showIsRequired(fromDateValue)}>*</span>
      </CFormLabel>
      <CCol sm={6}>
        <ReactDatePicker
          autoComplete="off"
          id="fromDate"
          data-testid="dateOptionSelect"
          className="form-control form-control-sm sh-date-picker sh-leave-form-control"
          showMonthDropdown
          showYearDropdown
          minDate={new Date()}
          dropdownMode="select"
          dateFormat="dd/MM/yy"
          placeholderText="dd/mm/yy"
          name="fromDate"
          value={fromDateValue}
          onChange={(date: Date) => fromDateChangeHandler(date)}
        />
      </CCol>
    </CRow>
  )
}

export default EventFromDate
