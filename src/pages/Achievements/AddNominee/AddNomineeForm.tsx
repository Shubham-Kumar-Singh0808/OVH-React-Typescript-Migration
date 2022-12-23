import {
  CForm,
  CContainer,
  CRow,
  CFormLabel,
  CFormSelect,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { useTypedSelector } from '../../../stateStore'
import { IncomingActiveEmployee } from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AddNomineeFormProps } from '../../../types/Achievements/AddNominee/AddNomineeTypes'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { emptyString, selectAchievementType } from '../AchievementConstants'
import AchievementEntryContainer from '../AddAchiever/AchievementTypeList/AchievementEntryContainer'
import FilterEmployeeName from '../AddAchiever/AddAchieverComponents/FilterEmployeeName'

const getEmployeeId = (list: IncomingActiveEmployee[], name: string) => {
  const data = list.find(
    (item) => item.empFirstName + ' ' + item.empLastName === name,
  )
  if (!data) {
    return -1
  }
  return data.employeeId
}

const AddNomineeForm = (props: AddNomineeFormProps) => {
  const {
    achievementType,
    setAchievementType,
    nominatedEmployeeName,
    setNominatedEmployeeName,
    nomineeQuestions,
    setNomineeQuestions,
  } = props
  const allActiveEmployees = useTypedSelector(
    (state) => state.addAchiever.activeEmployeeList,
  )
  const achievementTypes = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )
  const formDetails = useTypedSelector(
    (state) => state.addNominee.nominationFormDetails,
  )
  const [employeeName, setEmployeeName] = useState<string | undefined>(
    nominatedEmployeeName,
  )

  useEffect(() => {
    if (
      formDetails.nominationQuestionDataDtosId &&
      formDetails.nominationQuestionDataDtosId.length > 0
    ) {
      setNomineeQuestions(formDetails.nominationQuestionDataDtosId)
    }
  }, [formDetails.nominationQuestionDataDtosId])

  const achievementTypeChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAchievementType(e.target.value)
  }

  const employeeNameChangeHandler = (value: string) => {
    setNominatedEmployeeName(value)
  }

  const nominationQuestionChangeHandler = (content: string, index: number) => {
    const currentObject = nomineeQuestions[index]
    currentObject.feedBack = content
    const splicedList = nomineeQuestions.
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNominatedEmployeeName(undefined)
    setAchievementType(selectAchievementType)
  }

  return (
    <CForm>
      <CContainer className="mt-4 ms-2">
        <FilterEmployeeName
          setEmployeeName={setEmployeeName}
          allEmployees={allActiveEmployees}
          employeeName={employeeName}
          onSelectEmployee={employeeNameChangeHandler}
          labelClass="col-sm-2 col-form-label text-end"
        />
        <AchievementEntryContainer>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Achievement Type:
            <span
              className={
                achievementType === selectAchievementType
                  ? TextDanger
                  : TextWhite
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol md={3}>
            <CFormSelect
              onChange={achievementTypeChangeHandler}
              value={achievementType}
              size="sm"
            >
              <option value={selectAchievementType}>
                {selectAchievementType}
              </option>
              {achievementTypes.list.map((item, index) => (
                <option key={index} value={item.typeName}>
                  {item.typeName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Cycle:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput readOnly value={formDetails.cycleName} />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            From Month:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput
              readOnly
              value={formDetails.fromMonth}
              placeholder="mm/yyyy"
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            To Month:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput
              readOnly
              value={formDetails.toMonth}
              placeholder="mm/yyyy"
            />
          </CCol>
        </AchievementEntryContainer>
      </CContainer>
      <CContainer>
        {formDetails.nominationQuestionDataDtosId?.map((item, index) => (
          <CContainer key={index} className="mb-5">
            <CFormLabel>
              {index + 1}. {item.questions}
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
              initData={emptyString}
              debug={true}
              config={ckeditorConfig}
              onChange={({ editor }) => console.log(editor.getData().trim())}
            />
          </CContainer>
        ))}
      </CContainer>
      <CRow>
        <CFormLabel className="col-form-label category-label col-sm-1 col-form-label text-end"></CFormLabel>
        <CCol sm={4}>
          <CButton
            data-testid="view-btn-id"
            type="submit"
            className="btn-ovh me-1"
            color="success"
          >
            Add
          </CButton>
          <CButton
            data-testid="clear-btn-id"
            color="warning "
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

export default AddNomineeForm
