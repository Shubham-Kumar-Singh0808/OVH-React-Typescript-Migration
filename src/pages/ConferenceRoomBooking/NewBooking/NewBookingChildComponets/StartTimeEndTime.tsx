import React from 'react'
import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'

const StartTimeEndTime = (): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Start Time:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          End Time:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CCol sm={12}>
            <CRow>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  aria-label="location"
                  id="location"
                  data-testid="locationSelect"
                  name="location"
                >
                  <option value="">00</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default StartTimeEndTime
