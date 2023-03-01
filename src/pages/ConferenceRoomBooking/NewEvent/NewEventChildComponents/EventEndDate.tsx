import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { showIsRequired } from '../../../../utils/helper'

const EventEndDate = ({
  toDateValue,
  toDateChangeHandler,
}: {
  toDateChangeHandler: (e: Date) => void
  toDateValue: string
}): JSX.Element => {
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-3 col-form-label text-end">
        End Date :<span className={showIsRequired(toDateValue)}>*</span>
      </CFormLabel>
      <CCol sm={6}>
        <ReactDatePicker
          autoComplete="off"
          id="toDate"
          data-testid="dateOptionSelect"
          className="form-control form-control-sm sh-date-picker sh-leave-form-control"
          showMonthDropdown
          showYearDropdown
          maxDate={disableAfterDate}
          minDate={new Date()}
          dropdownMode="select"
          dateFormat="dd/mm/yy"
          placeholderText="DD/MM/YYYY"
          name="toDate"
          value={toDateValue}
          onChange={(date: Date) => toDateChangeHandler(date)}
        />
      </CCol>
    </CRow>
  )
}

export default EventEndDate
