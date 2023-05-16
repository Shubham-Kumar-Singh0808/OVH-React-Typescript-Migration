import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

const WarrantyDateStatus = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string>()
  const [fromDate, setFromDate] = useState<string | Date>()
  const [toDate, setToDate] = useState<string | Date>()
  return (
    <>
      <CRow className="employeeAllocation-form  mt-4">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-2">Select:</CFormLabel>
        </CCol>

        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDate"
            data-testid="form-select1"
            name="selectDate"
            value={selectDate}
            onChange={(e) => {
              setSelectDate(e.target.value)
            }}
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        {selectDate === 'Custom' ? (
          <>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">From:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                name="fromDate"
                id="fromDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDate as string}
                onChange={(date: Date) => {
                  setFromDate(date)
                }}
                selected={fromDate as Date}
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">To:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDate as string}
                onChange={(date: Date) => {
                  setToDate(date)
                }}
                selected={toDate as Date}
              />
            </CCol>
          </>
        ) : (
          <></>
        )}
        <CRow className="mt-4 mb-4">
          <CCol sm={9} md={{ offset: 3 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              data-testid="view-btn"
              //   onClick={viewButtonHandler}
              //   disabled={
              //     (selectDay === 'Custom' &&
              //       !(fromDate !== '' && toDate !== '')) ||
              //     dateError
              //   }
            >
              View
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={false}
              color="warning btn-ovh me-1"
              //   onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CRow>
    </>
  )
}

export default WarrantyDateStatus
