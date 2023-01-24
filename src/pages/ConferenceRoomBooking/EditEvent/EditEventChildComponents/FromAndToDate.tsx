import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import React from 'react'

const FromAndToDate = ({
  fromDate,
  endDate,
}: {
  fromDate: string
  endDate: string
}): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel
          className="col-sm-3 col-form-label text-end"
          data-testid="pmLabel"
        >
          From Date:
        </CFormLabel>
        <CCol sm={6}>
          <CFormInput
            data-testid="event-from-date"
            autoComplete="off"
            type="text"
            name="fromDate"
            disabled
            value={fromDate}
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel
          className="col-sm-3 col-form-label text-end"
          data-testid="pmLabel"
        >
          End Date:
        </CFormLabel>
        <CCol sm={6}>
          <CFormInput
            data-testid="event-to-date"
            autoComplete="off"
            type="text"
            name="toDate"
            disabled
            value={endDate}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default FromAndToDate
