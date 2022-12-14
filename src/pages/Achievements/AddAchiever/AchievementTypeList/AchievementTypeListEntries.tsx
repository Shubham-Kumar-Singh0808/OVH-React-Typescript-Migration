import {
  CContainer,
  CForm,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React from 'react'
import { TextDanger } from '../../../../constant/ClassName'
import { AddAchieverTypeEntriesProps } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import AchievementEntryContainer from './AchievementEntryContainer'

const AchievementTypeListEntries = (props: AddAchieverTypeEntriesProps) => {
  const { userSelectedAchievementType, achievementTypeNameHandler } = props
  return (
    <CForm>
      <CContainer className="mt-4 ms-2">
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Achievement Type Name:{' '}
            {userSelectedAchievementType === '' ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              placeholder="Achievement Type Name"
              onChange={achievementTypeNameHandler}
            />
          </CCol>
        </CRow>
        <AchievementEntryContainer label={{'Achievement Type Name:'}{' '}
            {userSelectedAchievementType === '' ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}}><CCol sm={3}>
            <CFormInput
              type="text"
              placeholder="Achievement Type Name"
              onChange={achievementTypeNameHandler}
            />
          </CCol></AchievementEntryContainer>
        <CRow className="mt-4 mb-4 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Status:{' '}
            {userSelectedAchievementType === '' ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={1}>
            <CFormCheck
              type="radio"
              label="Active"
              name="achievementStatus"
              inline
            />
          </CCol>
          <CCol sm={1}>
            <CFormCheck
              type="radio"
              label="Inactive"
              name="achievementStatus"
              inline
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Order:{' '}
            {userSelectedAchievementType === '' ? (
              <span className={TextDanger}>*</span>
            ) : (
              <></>
            )}
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput type="number" onChange={achievementTypeNameHandler} />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Time Period Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck type="checkbox" />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Date Required:{' '}
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck type="checkbox" />
          </CCol>
        </CRow>
      </CContainer>
    </CForm>
  )
}

export default AchievementTypeListEntries
