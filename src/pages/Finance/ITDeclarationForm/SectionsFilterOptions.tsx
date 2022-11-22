import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'

const SectionsFilterOptions = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputSection',
    className: 'col-form-label sections-label',
  }
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CCol sm={1}>
          <CFormLabel {...formLabelProps}>Sections:</CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormSelect />
        </CCol>
        <CCol sm={2} className="d-flex align-items-center">
          <CButton color="info" className="text-white btn-ovh" size="sm">
            <i className="fa fa-plus me-1"></i>
            More Sections
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default SectionsFilterOptions
