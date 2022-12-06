import {
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CCardHeader,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

const EmployeesJoinedAfterApril2018 = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <>
      <CCardHeader>
        <h4 className="h4">
          Employees Who Joined After 1st April 2018 (Income from Previous
          Employer ( Joined After 1st-April-2018 ))
        </h4>
      </CCardHeader>
      <CRow className="mt-4 mb-4">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Organization:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormInput
            type="text"
            id="org"
            size="sm"
            placeholder="Organization"
            name="organization"
            maxLength={12}
          ></CFormInput>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel className="mt-1">From Date:</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <ReactDatePicker
                id="fromDate"
                data-testid="itdf-FromDate"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="n/a"
                name="fromDate"
                onChange={(date: Date) => setEndDate(date)}
              />
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel className="mt-1">To Date:</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <ReactDatePicker
                id="toDate"
                data-testid="itdf-tDate"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="n/a"
                name="toDate"
                // value={}
                onChange={(date: Date) => setStartDate(date)}
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={5} md={1} className="text-end">
          <CFormLabel>Document:</CFormLabel>
        </CCol>
        <CCol sm={7}>
          <input
            data-testid="feedback-form"
            type="file"
            name="upload-form"
            accept=".doc, .docx, .pdf"
            // onChange={}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeesJoinedAfterApril2018
