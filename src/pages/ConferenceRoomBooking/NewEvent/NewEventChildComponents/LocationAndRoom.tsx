import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormCheck,
  CFormInput,
} from '@coreui/react-pro'
import React from 'react'

const LocationAndRoom = (): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Location:
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
            <option value="">Select Location</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Room:
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
            <option value="">Select Room</option>
          </CFormSelect>
          <CFormCheck
            className="mt-4 fw-bold"
            id="trigger"
            label="Other Place"
            // checked={baseLocationShown}
            // onChange={() => setBaseLocationShown(!baseLocationShown)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CCol sm={{ span: 4, offset: 2 }}>
          <CFormInput
            type="text"
            data-testid="selectSubject"
            id="subjectValue"
            name="subjectValue"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default LocationAndRoom
