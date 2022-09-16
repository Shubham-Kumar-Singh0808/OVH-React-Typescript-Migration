import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React from 'react'

const BookingListFilterOptions = (): JSX.Element => {
  return (
    <>
      <CRow className="employeeAllocation-form">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Location:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="Select"
            data-testid="form-select1"
            name="Select"
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

        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Employee Billing Status:</CFormLabel>
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
            <option value="true">Billable</option>
            <option value="false">Non-Billable</option>
            <option value="onBench">Bench</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default BookingListFilterOptions
