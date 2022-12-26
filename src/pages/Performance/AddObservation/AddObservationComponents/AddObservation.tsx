import { CContainer, CForm, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import WrapperComponent from './WrapperComponent'

const AddObservation = () => {
  return (
    <WrapperComponent title="Add Observation">
      <CForm>
        <CContainer className="mt-3 ms-2">
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Employee:
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Subject:
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Month:
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Rating:
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Remark:
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Upload File:
            </CFormLabel>
          </CRow>
        </CContainer>
      </CForm>
    </WrapperComponent>
  )
}

export default AddObservation
