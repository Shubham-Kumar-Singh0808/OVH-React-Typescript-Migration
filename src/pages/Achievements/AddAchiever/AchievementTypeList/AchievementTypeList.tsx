import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import AchievementTypeListEntries from './AchievementTypeListEntries'

const AchievementTypeList = () => {
  const [userSelectedAchievementType, setSelectedAchievementType] =
    useState<string>('')

  const [userSelectedStatus, setUserSelectedStatus] = useState<boolean>(true)

  const achievementTypeNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedAchievementType(e.target.value)
  }

  return (
    <CContainer>
      <CRow className="mt-2 justify-content-end">
        <CCol xs={2} className="px-0">
          <CButton color="info" data-testid="back-btn" className="btn-ovh me-1">
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <AchievementTypeListEntries
        userSelectedAchievementType={userSelectedAchievementType}
        achievementTypeNameHandler={achievementTypeNameHandler}
      />
    </CContainer>
  )
}

export default AchievementTypeList
