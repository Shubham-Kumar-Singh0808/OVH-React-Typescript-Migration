import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'

import OAddButton from '../../../components/ReusableComponent/OAddButton'
import React from 'react'

const AddShift = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">{'headerTitle'}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Name :
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="shiftName"
                size="sm"
                type="text"
                name="shiftName"
                placeholder="Shift Name"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Start Time :
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                id="startTime"
                size="sm"
                type="text"
                name="startTimeHours"
                placeholder="Hours"
              />
            </CCol>
            <CCol sm={1}>
              <CFormInput
                id="startTime"
                size="sm"
                type="text"
                name="startTimeMin"
                placeholder="Min"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              End Time :
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                id="endTimeHours"
                size="sm"
                type="text"
                name="endTimeHours"
                placeholder="Hours"
              />
            </CCol>
            <CCol sm={1}>
              <CFormInput
                id="endTimeMin"
                size="sm"
                type="text"
                name="endTimeMin"
                placeholder="Min"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Grace period :
            </CFormLabel>
            <CCol sm={2}>
              <CFormInput
                id="gracePeriod"
                size="sm"
                type="text"
                name="gracePeriod"
                placeholder="In Minutes"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol sm={4}>
              <OAddButton />
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default AddShift
