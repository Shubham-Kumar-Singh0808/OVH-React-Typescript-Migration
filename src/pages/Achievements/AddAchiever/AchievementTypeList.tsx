import {
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React from 'react'

const AchievementTypeList = () => {
  return (
    <CForm>
      <CContainer className="mt-4 ms-2">
        <CRow>
          <div className="d-flex flex-row align-items-center">
            <CFormLabel>Select Achievement Type</CFormLabel>
            <CCol md={3}>
              <CFormSelect value={'hi'}>
                <option value={'Hi there'}>Hi there</option>
              </CFormSelect>
            </CCol>
          </div>
        </CRow>
      </CContainer>
    </CForm>
  )
}

export default AchievementTypeList
