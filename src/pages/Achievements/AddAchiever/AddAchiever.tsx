import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AchievementTypeList from './AchievementTypeList/AchievementTypeList'
import AchievementEntryContainer from './AchievementTypeList/AchievementEntryContainer'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  newAchievementLabelClass,
  selectAchievementType,
} from '../AchievementConstants'

const AddAchiever = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [addAchievementTypeButton, setAddAchievementTypeButton] =
    useState<boolean>(false)

  const achievementTypeDetailsAscendingList = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )

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
          <CContainer className="mt-4 ms-2">
            <AchievementEntryContainer>
              <CFormLabel
                data-testid="ach-name-label"
                className={newAchievementLabelClass}
              >
                Achievement Type:{' '}
              </CFormLabel>
              <CCol md={3}>
                <CFormSelect
                  size="sm"
                  value={selectAchievementType}
                  data-testid="ach-name-sel"
                >
                  <option
                    data-testid="ach-name-opt"
                    value={selectAchievementType}
                  >
                    {selectAchievementType}
                  </option>
                  {achievementTypeDetailsAscendingList.list.map(
                    (item, index) => (
                      <option
                        data-testid="ach-name-opt"
                        key={index}
                        value={item.typeName}
                      >
                        {item.typeName}
                      </option>
                    ),
                  )}
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CButton
                  color="info"
                  data-testid="add-ach-btn"
                  size="sm"
                  className="btn-ovh me-1"
                  onClick={addAchievementTypeButtonHandler}
                >
                  {' '}
                  + Add
                </CButton>
              </CCol>
            </AchievementEntryContainer>
          </CContainer>
        </CForm>
      )}
    </OCard>
  )
}

export default AddAchiever
