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
import {
  emptyString,
  errorAchievementNameMessage,
  ErrorBooleans,
  errorOrderMessage,
  newAchievementLabelClass,
} from '../../AchievementConstants'
import { useTypedSelector } from '../../../../stateStore'

const AchievementTypeListEntries = (
  props: AddAchieverTypeEntriesProps,
): JSX.Element => {
  const {
    isAddButtonEnabled,
    setAddButtonEnabled,
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

  const [errors, setErrors] = useState<ErrorBooleans>({
    achievementError1: false,
    achievementError2: false,
  })
  const existingAchievementTypeList = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList,
  )

  const isAchievementNameExists = (enteredName: string) => {
    const isPresent = existingAchievementTypeList.list.filter(
      (item) => item.typeName.toLowerCase() === enteredName.toLowerCase(),
    )
    return isPresent.length > 0
  }

  const isAchievementOrderExists = (enteredOrder: string) => {
    const isPresent = existingAchievementTypeList.list.filter(
      (item) => item.order === +enteredOrder,
    )
    return isPresent.length > 0
  }

  useEffect(() => {
    if (isAchievementOrderExists(newUserSelectedOrder)) {
      setErrors({ ...errors, achievementError2: true })
    } else {
      setErrors({ ...errors, achievementError2: false })
    }
  }, [newUserSelectedOrder])

  useEffect(() => {
    if (isAchievementNameExists(userNewSelectedAchievementType)) {
      setErrors({ ...errors, achievementError1: true })
    } else {
      setErrors({ ...errors, achievementError1: false })
    }
  }, [userNewSelectedAchievementType])

  useEffect(() => {
    if (
      userNewSelectedAchievementType === emptyString ||
      isAchievementOrderExists(newUserSelectedOrder) ||
      isAchievementNameExists(userNewSelectedAchievementType) ||
      newUserSelectedOrder === emptyString ||
      newUserSelectedOrder === '00'
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

  const enabledAddButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addButtonHandler()
    achievementClearButtonHandler()
  }

  const errorMessageOrderTernary = errors.achievementError2 ? (
    <p data-testid="uni-order-error" className={TextDanger}>
      {errorOrderMessage}
    </p>
  ) : undefined

  const errorMessageNameTernary = errors.achievementError1 ? (
    <p data-testid="uni-name-error" className={TextDanger}>
      {errorAchievementNameMessage}
    </p>
  ) : undefined

  return (
    <CForm onSubmit={enabledAddButtonHandler}>
      <CContainer className="mt-4 ms-2">
        <AchievementEntryContainer>
          <CFormLabel
            className={newAchievementLabelClass}
            data-testid="ach-name"
          >
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
              data-testid="ach-name-input"
              placeholder="Achievement Type Name"
              value={userNewSelectedAchievementType}
              onChange={newAchievementTypeNameHandler}
            />
          </CCol>
          <CCol sm={4}>{errorMessageNameTernary}</CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-status"
            className={newAchievementLabelClass}
          >
            Status:{' '}
          </CFormLabel>
          <CCol sm={2} md={1}>
            <CFormCheck
              type="radio"
              label="Active"
              value={NewAchievementStatus.Active}
              name="achievementStatusActive"
              data-testid="ach-status-input-active"
              defaultChecked={
                newUserSelectedStatus === NewAchievementStatus.Active
              }
              checked={newUserSelectedStatus === NewAchievementStatus.Active}
              onChange={newAchievementStatusHandler}
              inline
            />
          </CCol>
          <CCol sm={2} md={1}>
            <CFormCheck
              type="radio"
              label="Inactive"
              value={NewAchievementStatus.Inactive}
              data-testid="ach-status-input-inactive"
              defaultChecked={
                newUserSelectedStatus === NewAchievementStatus.Inactive
              }
              checked={newUserSelectedStatus === NewAchievementStatus.Inactive}
              onChange={newAchievementStatusHandler}
              name="achievementStatus"
              inline
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-order"
            className={newAchievementLabelClass}
          >
            Order:{' '}
            {newUserSelectedOrder === emptyString ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="ach-order-input"
              maxLength={2}
              value={newUserSelectedOrder}
              onChange={newSelectedOrderHandler}
            />
          </CCol>
          <CCol sm={2} data-testid="check">
            {errorMessageOrderTernary}
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-time"
            className={newAchievementLabelClass}
          >
            Time Period Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              type="checkbox"
              data-testid="ach-time-check"
              valid={true}
              checked={newUserSelectedTimeReq}
              onChange={newSelectedTimeReqHandler}
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-date"
            className={newAchievementLabelClass}
          >
            Date Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              type="checkbox"
              data-testid="ach-date-check"
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
            data-testid="add-btn-id"
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
