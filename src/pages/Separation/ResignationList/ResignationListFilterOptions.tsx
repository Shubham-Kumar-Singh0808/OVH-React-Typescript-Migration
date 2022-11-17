import { CRow, CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { deviceLocale, showIsRequired } from '../../../utils/helper'

const ResignationListFilterOptions = (): JSX.Element => {
  const [dateError, setDateError] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<Date | string>()
  const [toDate, setToDate] = useState<Date | string>()
  const commonFormatDate = 'l'
  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''
  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])
  return (
    <>
      <CRow className="employeeAllocation-form">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="Select"
            data-testid="form-select1"
            name="Select"
          >
            <option value="Today">Select Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billingStatus"
            data-testid="form-select2"
            name="billingStatus"
          >
            <option value="All" selected>
              All
            </option>
            <option value="All">All</option>
            <option value="Resigned">Resigned</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Under Notice">Under Notice</option>
            <option value="Relieved">Relieved</option>
            <option value="Absconding">Absconding</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Employee Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="allocationStatus"
            data-testid="form-select3"
            name="allocationStatus"
          >
            <option value="">Employee Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </CFormSelect>
        </CCol>
        <>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">
              From:{' '}
              <span className={showIsRequired(fromDate as string)}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={2}>
            <DatePicker
              className="form-control form-control-sm sh-date-picker"
              data-testid="date-picker"
              placeholderText="dd/mm/yy"
              name="fromDate"
              maxDate={new Date()}
              autoComplete="off"
              id="fromDate"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={fromDateValue}
              onChange={(date: Date) => setFromDate(date)}
              selected={fromDate as Date}
            />
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">
              To:<span className={showIsRequired(toDate as string)}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={2}>
            <DatePicker
              className="form-control form-control-sm sh-date-picker"
              data-testid="date-picker"
              placeholderText="dd/mm/yy"
              name="toDate"
              id="toDate"
              autoComplete="off"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={toDateValue}
              onChange={(date: Date) => setToDate(date)}
              selected={toDate as Date}
            />
            {dateError && (
              <span className="text-danger" data-testid="errorMessage">
                To date should be greater than From date
              </span>
            )}
          </CCol>
        </>
      </CRow>
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            data-testid="view-btn"
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            data-testid="clear-btn"
            color="warning btn-ovh me-1"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default ResignationListFilterOptions
