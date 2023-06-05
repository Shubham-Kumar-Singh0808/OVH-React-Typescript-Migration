import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useHistory } from 'react-router-dom'
import QuestionCheck from './QuestionCheck'
import {
  CheckedQuestionsOptions,
  EnrollmentFormProps,
  FilledLeadershipForm,
  OutgoingLeadershipForm,
} from '../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { emptyString } from '../AchievementConstants'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const initialAnswersState: FilledLeadershipForm = {
  acceptance: null,
  communicate: null,
  constructiveCriticism: null,
  directlyWorking: null,
  helper: null,
  initiative: null,
  innovationAndResearch: null,
  leader: null,
  teamWorker: null,
  travelOnsite: null,
}

const convertToBooleanValues = (value: string | null): boolean => {
  return value === String(CheckedQuestionsOptions.yes)
}

const EnrollmentForm = (props: EnrollmentFormProps): JSX.Element => {
  const {
    reasonDetails,
    setReasonDetails,
    expectationsExample,
    setExpectationsExample,
  } = props
  const history = useHistory()
  const dispatch = useAppDispatch()
  const employeeDetails = useTypedSelector(
    (state) => state.leadershipEnrollmentForm.employeeDetails,
  )

  const [isSubmitButtonEnabled, setSubmitButtonEnabled] =
    useState<boolean>(false)

  const [enteredAnswers, setEnteredAnswers] =
    useState<FilledLeadershipForm>(initialAnswersState)

  const [showEditors, setShowEditors] = useState<boolean>(true)

  const isNullValuePresent = () => {
    for (const [key, value] of Object.entries(enteredAnswers)) {
      if (key && value === null) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (
      reasonDetails.trim().length === 0 ||
      expectationsExample.trim().length === 0 ||
      isNullValuePresent()
    ) {
      setSubmitButtonEnabled(false)
    } else {
      setSubmitButtonEnabled(true)
    }
  }, [enteredAnswers, reasonDetails, expectationsExample])

  const leaderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAnswers({ ...enteredAnswers, leader: e.target.value })
  }

  const communicateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAnswers({ ...enteredAnswers, communicate: e.target.value })
  }

  const initiativeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAnswers({ ...enteredAnswers, initiative: e.target.value })
  }

  const teamWorkerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAnswers({ ...enteredAnswers, teamWorker: e.target.value })
  }

  const constructiveCriticismChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredAnswers({
      ...enteredAnswers,
      constructiveCriticism: e.target.value,
    })
  }

  const helperChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAnswers({ ...enteredAnswers, helper: e.target.value })
  }

  const directlyWorkingChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredAnswers({ ...enteredAnswers, directlyWorking: e.target.value })
  }

  const travelOnsiteChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredAnswers({ ...enteredAnswers, travelOnsite: e.target.value })
  }

  const innovationAndResearchChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredAnswers({
      ...enteredAnswers,
      innovationAndResearch: e.target.value,
    })
  }

  const expectationsExampleChangeHandler = (value: string) => {
    setExpectationsExample(value)
  }

  const reasonDetailsChangeHandler = (value: string) => {
    setReasonDetails(value)
  }

  const acceptanceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    if (checked) {
      setEnteredAnswers({
        ...enteredAnswers,
        acceptance: String(CheckedQuestionsOptions.yes),
      })
    } else {
      setEnteredAnswers({ ...enteredAnswers, acceptance: null })
    }
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEnteredAnswers(initialAnswersState)
    setReasonDetails(emptyString)
    setExpectationsExample(emptyString)
    setShowEditors(false)
    setTimeout(() => {
      setShowEditors(true)
    }, 10)
  }

  const successToast = (
    <OToast toastColor="success" toastMessage="Form Submitted Successfully" />
  )

  const submitButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const finalData: OutgoingLeadershipForm = {
      employeeName: employeeDetails.name,
      employeeId: employeeDetails.Id,
      leader: convertToBooleanValues(enteredAnswers.leader),
      initiative: convertToBooleanValues(enteredAnswers.initiative),
      communicate: convertToBooleanValues(enteredAnswers.communicate),
      acceptance: convertToBooleanValues(enteredAnswers.acceptance),
      directlyWorking: convertToBooleanValues(enteredAnswers.directlyWorking),
      constructiveCriticism: convertToBooleanValues(
        enteredAnswers.constructiveCriticism,
      ),
      teamWorker: convertToBooleanValues(enteredAnswers.teamWorker),
      travelOnsite: convertToBooleanValues(enteredAnswers.travelOnsite),
      helper: convertToBooleanValues(enteredAnswers.helper),
      innovationAndResearch: convertToBooleanValues(
        enteredAnswers.innovationAndResearch,
      ),
      reasonDetails,
      expectationsExample,
    }
    const result = await dispatch(
      reduxServices.leadershipEnrollmentForm.addLeadershipThunk(finalData),
    )
    if (
      reduxServices.leadershipEnrollmentForm.addLeadershipThunk.fulfilled.match(
        result,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      history.replace('/dashboard')
    }
  }

  const reasonDetailsAsterixCondition = () => {
    return reasonDetails === emptyString || reasonDetails.trim().length === 0
      ? TextDanger
      : TextWhite
  }

  const expectationExampleAsterixCondition = () => {
    return expectationsExample === emptyString ||
      expectationsExample.trim().length === 0
      ? TextDanger
      : TextWhite
  }

  return (
    <CForm onSubmit={submitButtonHandler}>
      <CContainer>
        <CRow className="align-items-center">
          <CFormLabel
            data-testid="emp-name-test"
            className="col-sm-4 col-form-label text-end pe-1"
          >
            Employee Name:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol sm={7} className="align-items-center">
            <p className="mb-0">
              <b data-testid="emp-name-value">{employeeDetails.name}</b>
            </p>
          </CCol>
        </CRow>
        <CRow className="align-items-center">
          <CFormLabel
            data-testid="emp-id-test"
            className="col-sm-4 col-form-label text-end pe-1"
          >
            Employee ID:
            <span className={TextWhite}>*</span>
          </CFormLabel>
          <CCol sm={7} className="align-items-center">
            <p className="mb-0">
              <b data-testid="emp-id-value">{employeeDetails.Id}</b>
            </p>
          </CCol>
        </CRow>
        <QuestionCheck
          question="Are you a Leader?"
          isChecked={enteredAnswers.leader}
          changeHandler={leaderChangeHandler}
        />
        <QuestionCheck
          question="Do you communicate clearly and effectively?"
          isChecked={enteredAnswers.communicate}
          changeHandler={communicateChangeHandler}
        />
        <QuestionCheck
          question="Are you interested in taking initiative?"
          isChecked={enteredAnswers.initiative}
          changeHandler={initiativeChangeHandler}
        />
        <QuestionCheck
          question="Are you good at working with a team?"
          isChecked={enteredAnswers.teamWorker}
          changeHandler={teamWorkerChangeHandler}
        />
        <QuestionCheck
          question="Do you accept constructive criticism?"
          isChecked={enteredAnswers.constructiveCriticism}
          changeHandler={constructiveCriticismChangeHandler}
        />
        <QuestionCheck
          question="Do you help others to ensure the team delivers on time?"
          isChecked={enteredAnswers.helper}
          changeHandler={helperChangeHandler}
        />
        <QuestionCheck
          question="Are you good at working directly with clients?"
          isChecked={enteredAnswers.directlyWorking}
          changeHandler={directlyWorkingChangeHandler}
        />
        <QuestionCheck
          question="Are you open to travel onsite, USA, Australia & Canada?"
          isChecked={enteredAnswers.travelOnsite}
          changeHandler={travelOnsiteChangeHandler}
        />
        <QuestionCheck
          question="Are you open to innovation and Research for growth?"
          isChecked={enteredAnswers.innovationAndResearch}
          changeHandler={innovationAndResearchChangeHandler}
        />
      </CContainer>
      {showEditors ? (
        <CContainer>
          <CRow className="align-items-center mb-5">
            <CFormLabel
              data-testid="reason-editor-test"
              className="col-sm-4 col-form-label text-end mb-1 align-self-start pe-1"
            >
              Please let us know why you want to be part of this elite group:
              <span className={reasonDetailsAsterixCondition()}>*</span>
            </CFormLabel>
            <CCol sm={8}>
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={emptyString}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  reasonDetailsChangeHandler(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
          <CRow className="align-items-center mb-1">
            <CFormLabel
              data-testid="expectation-editor-test"
              className="col-sm-4 col-form-label text-end mb-1 align-self-start pe-1"
            >
              Please let us know any example where you really exceeded
              expectations:
              <span className={expectationExampleAsterixCondition()}>*</span>
            </CFormLabel>
            <CCol sm={8}>
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={emptyString}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  expectationsExampleChangeHandler(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <></>
      )}
      <CRow className="align-items-center mt-4 mb-4">
        <CFormLabel
          data-testid="emp-agree"
          className="col-sm-4 col-form-label text-end pe-1"
        >
          <CFormCheck
            data-testid="acceptance-check"
            required
            checked={enteredAnswers.acceptance !== null}
            onChange={acceptanceChangeHandler}
          />
        </CFormLabel>
        <CCol sm={7} className="align-items-center">
          <strong data-testid="acceptance-label">
            I hereby declare that the above furnished information has been
            accepted by me
          </strong>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CCol md={{ span: 6, offset: 4 }}>
          <>
            <CButton
              type="submit"
              color="success"
              className="btn-ovh me-1"
              data-testid="submit-btn"
              disabled={!isSubmitButtonEnabled}
            >
              Submit
            </CButton>
            <CButton
              color="warning"
              data-testid="clear-btn"
              className="btn-ovh me-1"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default EnrollmentForm
