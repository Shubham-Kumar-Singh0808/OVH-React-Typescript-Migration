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
  const [selectedAchievementType, setSelectedAchievementType] =
    useState<string>('')
  return (
    <CForm>
      <CContainer className="mt-4 ms-2">
        <CRow>
          <div className="d-flex flex-row align-items-center flex-wrap">
            <CFormLabel className="mb-1">
              Select Achievement Type:{' '}
              {(eventToDate == null || eventToDate === '') && (
                <span className={TextDanger}>*</span>
              )}
            </CFormLabel>
            <CCol xs={12} md={3}>
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
