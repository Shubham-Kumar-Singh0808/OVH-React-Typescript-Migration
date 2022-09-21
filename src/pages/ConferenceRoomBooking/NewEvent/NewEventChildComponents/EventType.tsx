import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
import React from 'react'

const EventType = (): JSX.Element => {
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-2 col-form-label text-end">
        EventType:
        <span>*</span>
      </CFormLabel>
      <CCol sm={4}>
        <CFormSelect
          aria-label="location"
          id="location"
          data-testid="locationSelect"
          name="location"
          // value={trackerValue}
          // onChange={(e) => {
          //   setTrackerValue(e.target.value)
          // }}
        >
          <option value="">Select Event</option>
        </CFormSelect>
      </CCol>
      <CCol className="col-sm-3">
        <CButton color="info btn-ovh me-1">
          <i className="fa fa-plus me-1"></i>Add
        </CButton>
      </CCol>
    </CRow>
  )
}

export default EventType
