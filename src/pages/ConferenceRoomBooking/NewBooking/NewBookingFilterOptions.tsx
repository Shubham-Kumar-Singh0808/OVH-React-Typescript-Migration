import React from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import NewRoomReservedBy from './NewBookingChildComponets/NewRoomReservedBy'
import StartTimeEndTime from './NewBookingChildComponets/StartTimeEndTime'
import SelectProject from './NewBookingChildComponets/SelectProject'
import Attendees from './NewBookingChildComponets/Attendees'

const NewBookingFilterOptions = (): JSX.Element => {
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
          >
            <option value="">Select Room</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <NewRoomReservedBy />
      <StartTimeEndTime />
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Subject:
          <span>*</span>
        </CFormLabel>
        <CCol sm={5}>
          <CFormTextarea
            placeholder="Purpose"
            aria-label="textarea"
          ></CFormTextarea>
        </CCol>
      </CRow>
      <SelectProject />
      <Attendees />
      <CRow className="mt-5 mb-4">
        <CCol md={{ span: 6, offset: 2 }}>
          <>
            <CButton
              className="btn-ovh me-1"
              data-testid="confirmBtn"
              color="success"
            >
              Confirm
            </CButton>
            <CButton
              color="warning "
              data-testid="clearBtn"
              className="btn-ovh"
            >
              Clear
            </CButton>
          </>
        </CCol>
      </CRow>
    </>
  )
}

export default NewBookingFilterOptions
