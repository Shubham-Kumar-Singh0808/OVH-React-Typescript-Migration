import {
  CForm,
  CContainer,
  CFormLabel,
  CFormSelect,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import OToast from '../../../components/ReusableComponent/OToast'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { IncomingActiveEmployee } from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import {
  AddNomineeFormProps,
  IncomingNominationFormDetails,
} from '../../../types/Achievements/AddNominee/AddNomineeTypes'
import { IncomingAchievementTypes } from '../../../types/Achievements/commonAchievementTypes'
import { IncomingNominationQuestions } from '../../../types/Achievements/NomineeList/NomineeListTypes'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import {
  descriptionLengthError,
  emptyString,
  selectAchievementType,
} from '../AchievementConstants'
import AchievementEntryContainer from '../AddAchiever/AchievementTypeList/AchievementEntryContainer'
import FilterEmployeeName from '../AddAchiever/AddAchieverComponents/FilterEmployeeName'

const getEmployeeId = (
  list: IncomingActiveEmployee[],
  name: string,
): number => {
  const data = list.find(
    (item) => item.empFirstName + ' ' + item.empLastName === name,
  )
  if (!data) {
    return -1
  }
  return data.employeeId
}

const getAchievementTypeId = (
  list: IncomingAchievementTypes,
  name: string,
): number => {
  for (const item of list.list) {
    if (item.typeName === name) {
      return item.id
    }
  }

  return -1
}

const AddNomineeForm = (props: AddNomineeFormProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const {
    achievementType,
    setAchievementType,
    nominatedEmployeeName,
    setNominatedEmployeeName,
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
  const userAccessToFeatures = useTypedSelector((state) =>
    state.userAccessToFeatures.userAccessToFeatures?.find(
      (item) => item.featureId === 239,
    ),
  )

  const showHierachyAchievementTypeList = useTypedSelector(
    (state) => state.userAccessToFeatures.userAccessToFeatures,
  ).find((item) => item.featureId === 296)?.viewaccess

  const userFullName = useTypedSelector(
    (state) => state.getLoggedInEmployeeData.generalInformation?.fullName,
  )

  console.log(userFullName)

  const descriptionContent = useTypedSelector(
    (state) => state.addNominee.questionsInformation,
  )
  const [employeeName, setEmployeeName] = useState<string | undefined>()

  const [showEditors, setShowEditors] = useState<boolean>(true)
  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)

  const getHierachyAchievementTypeList = () => {
    return achievementTypes.list.filter(
      (item) => item.createdBy === userFullName,
    )
  }

  useEffect(() => {
    if (
      achievementType === selectAchievementType ||
      nominatedEmployeeName === emptyString
    ) {
      setAddButtonEnabled(false)
    } else {
      setAddButtonEnabled(true)
      for (const item of descriptionContent) {
        if (item.isDone === false) {
          setAddButtonEnabled(false)
          break
        }
      }
    }
  }, [nominatedEmployeeName, achievementType, descriptionContent])

  useEffect(() => {
    if (getEmployeeId(allActiveEmployees, nominatedEmployeeName) === -1) {
      setNominatedEmployeeName(emptyString)
      setEmployeeName(undefined)
    }
  }, [nominatedEmployeeName])

  const achievementTypeChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAchievementType(e.target.value)
  }

  const employeeNameChangeHandler = (value: string) => {
    setNominatedEmployeeName(value)
  }

  const nominationQuestionChangeHandler = (
    description: string,
    index: number,
  ) => {
    dispatch(
      reduxServices.addNominee.actions.setQuestionInformationIndexContent({
        description,
        index,
      }),
    )
  }

  const clearHandler = () => {
    setNominatedEmployeeName(emptyString)
    setEmployeeName(undefined)
    setShowEditors(false)
    setTimeout(() => {
      setShowEditors(true)
    }, 10)
    setAchievementType(selectAchievementType)
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    clearHandler()
  }

  const addButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const questionsData: IncomingNominationQuestions[] = Array.from(
      formDetails.nominationQuestionDataDtosId,
    )
    for (let i = 0; i < questionsData.length; i++) {
      questionsData[i] = {
        ...questionsData[i],
        feedBack: descriptionContent[i].description,
      }
    }
    const finalData: IncomingNominationFormDetails = {
      ...formDetails,
      achievementTypeId: getAchievementTypeId(
        achievementTypes,
        achievementType,
      ),
      cycleID: formDetails.cycleID,
      cycleName: formDetails.cycleName,
      employeeId: getEmployeeId(allActiveEmployees, nominatedEmployeeName),
      nominationQuestionDataDtosId: questionsData,
    }

    const successToast = (
      <OToast toastColor="success" toastMessage="Nominee Added Successfully" />
    )

    const result = await dispatch(
      reduxServices.addNominee.addNomineeThunk(finalData),
    )

    if (reduxServices.addNominee.addNomineeThunk.fulfilled.match(result)) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      clearHandler()
    } else if (
      reduxServices.addNominee.addNomineeThunk.rejected.match(result) &&
      result.payload === 406
    ) {
      const existsToast = (
        <OToast toastColor="danger" toastMessage="Nominee Already Exists" />
      )
      dispatch(reduxServices.app.actions.addToast(existsToast))
    }
  }

  return (
    <CForm onSubmit={addButtonHandler}>
      <CContainer className="mt-4 ms-2">
        <FilterEmployeeName
          setEmployeeName={setEmployeeName}
          allEmployees={allActiveEmployees}
          employeeName={employeeName}
          onSelectEmployee={employeeNameChangeHandler}
          labelClass="col-sm-2 col-form-label text-end"
        />
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-type-label"
            className="col-sm-2 col-form-label text-end"
          >
            Achievement Type:
            <span
              data-testid="ach-star"
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
              data-testid="ach-name-sel"
            >
              <option value={selectAchievementType}>
                {selectAchievementType}
              </option>
              {(showHierachyAchievementTypeList
                ? getHierachyAchievementTypeList()
                : achievementTypes.list
              ).map((item, index) => (
                <option key={index} value={item.typeName}>
                  {item.typeName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="cycle-label"
            className="col-sm-2 col-form-label text-end"
          >
            Cycle:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput
              data-testid="cycle-read"
              readOnly
              value={formDetails.cycleName}
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="fromMonth-label"
            className="col-sm-2 col-form-label text-end"
          >
            From Month:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput
              readOnly
              data-testid="fromMonth-read"
              value={formDetails.fromMonth}
              placeholder="mm/yyyy"
            />
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="toMonth-label"
            className="col-sm-2 col-form-label text-end"
          >
            To Month:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol md={3}>
            <CFormInput
              data-testid="toMonth-read"
              readOnly
              value={formDetails.toMonth}
              placeholder="mm/yyyy"
            />
          </CCol>
        </AchievementEntryContainer>
      </CContainer>
      <CContainer className="mt-3 mb-3">
        {formDetails.nominationQuestionDataDtosId?.map((item, index) => (
          <CContainer key={index}>
            <CFormLabel data-testid="question-label">
              {index + 1}. {item.questions}
              <span
                data-testid={`ques-star-${index}`}
                className={
                  descriptionContent.length > 0 &&
                  descriptionContent?.at(index)?.isDone
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            {showEditors && (
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={emptyString}
                key={index}
                debug={true}
                config={ckeditorConfig}
                onChange={({ editor }) =>
                  nominationQuestionChangeHandler(
                    editor.getData().trim(),
                    index,
                  )
                }
              />
            )}

            {!descriptionContent?.at(index)?.isDone ? (
              <p data-testid={`ques-error-${index}`} className={TextDanger}>
                {descriptionLengthError}
              </p>
            ) : (
              <></>
            )}
          </CContainer>
        ))}
      </CContainer>
      <CContainer>
        <div className="d-flex flex-row ms-3 flex-wrap-row">
          <CCol md={{ span: 4, offset: 0 }} className="mt-0">
            {userAccessToFeatures?.createaccess ? (
              <CButton
                data-testid="add-btn-id"
                type="submit"
                className="btn-ovh me-1"
                color="success"
                disabled={!isAddButtonEnabled}
              >
                Add
              </CButton>
            ) : (
              <span data-testid="add-inv"></span>
            )}
            <CButton
              data-testid="clear-btn-id"
              color="warning "
              className="btn-ovh me-1"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </div>
      </CContainer>
    </CForm>
  )
}

export default AddNomineeForm
