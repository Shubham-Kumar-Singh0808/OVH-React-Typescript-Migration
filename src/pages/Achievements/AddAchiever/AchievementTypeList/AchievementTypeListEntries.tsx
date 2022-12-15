import {
  CContainer,
  CForm,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AchievementEntryContainer from './AchievementEntryContainer'
import { TextDanger } from '../../../../constant/ClassName'
import {
  AddAchieverTypeEntriesProps,
  NewAchievementStatus,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { newAchievementLabelClass } from '../../AchievementConstants'
import { useTypedSelector } from '../../../../stateStore'

const AchievementTypeListEntries = (
  props: AddAchieverTypeEntriesProps,
): JSX.Element => {
  const {
    userNewSelectedAchievementType,
    newAchievementTypeNameHandler,
    newAchievementStatusHandler,
    newUserSelectedStatus,
    newUserSelectedOrder,
    newSelectedOrderHandler,
    newUserSelectedTimeReq,
    newSelectedTimeReqHandler,
    newUserSelectedDateReq,
    newSelectedDateReqHandler,
    addButtonHandler,
    achievementClearButtonHandler,
  } = props

  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)
  const existingAchievementTypeList = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList,
  )

  useEffect(() => {
    if (
      userNewSelectedAchievementType === '' ||
      newUserSelectedOrder === undefined
    ) {
      setAddButtonEnabled(false)
    } else {
      setAddButtonEnabled(true)
    }
  }, [userNewSelectedAchievementType, newUserSelectedOrder])

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    achievementClearButtonHandler()
  }

  return (
    <CForm onSubmit={addButtonHandler}>
      <CContainer className="mt-4 ms-2">
        <AchievementEntryContainer>
          <CFormLabel className={newAchievementLabelClass}>
            Achievement Type Name:{' '}
            {userNewSelectedAchievementType === '' ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              placeholder="Achievement Type Name"
              onChange={newAchievementTypeNameHandler}
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className={newAchievementLabelClass}>Status: </CFormLabel>
          <CCol sm={2} md={1}>
            <CFormCheck
              type="radio"
              label="Active"
              value={NewAchievementStatus.Active}
              name="achievementStatus"
              defaultChecked={
                newUserSelectedStatus === NewAchievementStatus.Active
              }
              onChange={newAchievementStatusHandler}
              inline
            />
          </CCol>
          <CCol sm={2} md={1}>
            <CFormCheck
              type="radio"
              label="Inactive"
              value={NewAchievementStatus.Inactive}
              defaultChecked={
                newUserSelectedStatus === NewAchievementStatus.Inactive
              }
              onChange={newAchievementStatusHandler}
              name="achievementStatus"
              inline
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className={newAchievementLabelClass}>
            Order:{' '}
            {newUserSelectedOrder === undefined ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="number"
              max={99}
              value={newUserSelectedOrder}
              onChange={newSelectedOrderHandler}
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className={newAchievementLabelClass}>
            Time Period Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              type="checkbox"
              valid={true}
              checked={newUserSelectedTimeReq}
              onChange={newSelectedTimeReqHandler}
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className={newAchievementLabelClass}>
            Date Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              type="checkbox"
              valid={true}
              checked={newUserSelectedDateReq}
              onChange={newSelectedDateReqHandler}
            />
          </CCol>
        </AchievementEntryContainer>
      </CContainer>
      <CRow>
        <CFormLabel className="col-form-label category-label col-sm-3 col-form-label text-end"></CFormLabel>
        <CCol sm={4}>
          <CButton
            data-testid="view-btn-id"
            type="submit"
            className="btn-ovh me-1"
            color="success"
            disabled={!isAddButtonEnabled}
          >
            Add
          </CButton>
          <CButton
            data-testid="clear-btn-id"
            color="warning"
            className="btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default AchievementTypeListEntries
