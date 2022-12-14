import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AchievementTypeList from './AchievementTypeList/AchievementTypeList'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const AddAchiever = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [addAchievementTypeButton, setAddAchievementTypeButton] =
    useState<boolean>(false)

  const addAchievementTypeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setAddAchievementTypeButton(true)
  }

  const closeAchievementTypeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setAddAchievementTypeButton(false)
  }

  useEffect(() => {
    dispatch(reduxServices.commonAchievements.getAllAchievementsType())
  }, [])

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
        <AchievementTypeList
          backButtonHandler={closeAchievementTypeButtonHandler}
        />
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
