import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import AchievementTypeList from './AchievementTypeList'
import OCard from '../../../components/ReusableComponent/OCard'

const AddAchiever = () => {
  const [addAchievementTypeButton, setAddAchievementTypeButton] =
    useState<boolean>(false)

  const addAchievementTypeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setAddAchievementTypeButton(true)
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={
        addAchievementTypeButton ? 'Achievement Type List' : "Add Achiever's"
      }
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {addAchievementTypeButton ? (
        <AchievementTypeList />
      ) : (
        <CForm>
          <CContainer>
            <CRow>
              <CFormLabel>Achievement Type</CFormLabel>
              <CCol md={3}>
                <CFormSelect size="sm" value={'hi'}>
                  <option>Hi there</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CButton size="sm" onClick={addAchievementTypeButtonHandler}>
                  {' '}
                  + Add
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>
      )}
    </OCard>
  )
}

export default AddAchiever
