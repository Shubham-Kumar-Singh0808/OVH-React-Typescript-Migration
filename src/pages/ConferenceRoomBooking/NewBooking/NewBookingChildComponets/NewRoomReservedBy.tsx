import React from 'react'
import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'

const NewRoomReservedBy = (): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Reserved by:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormInput
            type="text"
            data-testid="selectSubject"
            id="subjectValue"
            name="subjectValue"
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          From Date:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <ReactDatePicker
            id="toDate"
            data-testid="dateOptionSelect"
            className="form-control form-control-sm sh-date-picker sh-leave-form-control"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            minDate={new Date()}
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yy"
            name="toDate"
            onChange={(date: Date) => console.log(date)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default NewRoomReservedBy
